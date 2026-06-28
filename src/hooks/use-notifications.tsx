import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { apiGet, type Paginated, type Announcement, type EventItem } from "@/lib/api";

const LAST_SEEN_KEY = "sio_notifications_last_seen";
const NOTIFICATION_PERMISSION_KEY = "sio_notification_permission_asked";

interface NotificationData {
  newAnnouncementsCount: number;
  newEventsCount: number;
  totalNewCount: number;
  latestAnnouncements: Announcement[];
  latestEvents: EventItem[];
}

function getLastSeenTimestamp(): string {
  if (typeof window === "undefined") return new Date().toISOString();
  return localStorage.getItem(LAST_SEEN_KEY) || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // Default to 7 days ago
}

function setLastSeenTimestamp(timestamp: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LAST_SEEN_KEY, timestamp);
  }
}

async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  // Only ask once per session
  const alreadyAsked = sessionStorage.getItem(NOTIFICATION_PERMISSION_KEY);
  if (alreadyAsked) {
    return Notification.permission === "granted";
  }

  sessionStorage.setItem(NOTIFICATION_PERMISSION_KEY, "true");
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

function sendBrowserNotification(title: string, body: string, url?: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const notification = new Notification(title, {
    body,
    icon: "/favicon.ico",
    tag: "sio-notification",
  });

  if (url) {
    notification.onclick = () => {
      window.focus();
      window.location.href = url;
    };
  }
}

export function useNotifications() {
  const lastSeenRef = useRef(getLastSeenTimestamp());
  const previousCountRef = useRef<number | null>(null);

  // Fetch latest announcements
  const announcementsQuery = useQuery({
    queryKey: ["announcements-notifications"],
    queryFn: () => apiGet<Paginated<Announcement>>("/announcements/?page=1").catch(() => ({ results: [], count: 0 })),
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    staleTime: 1000 * 60 * 2,
  });

  // Fetch latest events
  const eventsQuery = useQuery({
    queryKey: ["events-notifications"],
    queryFn: () => apiGet<Paginated<EventItem>>("/events/?page=1").catch(() => ({ results: [], count: 0 })),
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  });

  const calculateNotificationData = useCallback((): NotificationData => {
    const lastSeen = lastSeenRef.current;
    const announcements = announcementsQuery.data?.results || [];
    const events = eventsQuery.data?.results || [];

    const newAnnouncements = announcements.filter(
      (a) => new Date(a.created_at) > new Date(lastSeen)
    );
    const newEvents = events.filter(
      (e) => new Date(e.created_at) > new Date(lastSeen)
    );

    return {
      newAnnouncementsCount: newAnnouncements.length,
      newEventsCount: newEvents.length,
      totalNewCount: newAnnouncements.length + newEvents.length,
      latestAnnouncements: newAnnouncements.slice(0, 5),
      latestEvents: newEvents.slice(0, 5),
    };
  }, [announcementsQuery.data, eventsQuery.data]);

  const notificationData = calculateNotificationData();

  // Send browser notification when new items are detected
  useEffect(() => {
    const sendNotifications = async () => {
      if (previousCountRef.current === null) {
        previousCountRef.current = notificationData.totalNewCount;
        return;
      }

      if (notificationData.totalNewCount > previousCountRef.current) {
        const hasPermission = await requestNotificationPermission();
        if (hasPermission) {
          const newCount = notificationData.totalNewCount - previousCountRef.current;
          if (notificationData.newAnnouncementsCount > 0) {
            sendBrowserNotification(
              "New Announcement - SIO R.T. Nagar",
              `${notificationData.latestAnnouncements[0]?.title || "Check out the latest announcements"}`,
              "/announcements"
            );
          } else if (notificationData.newEventsCount > 0) {
            sendBrowserNotification(
              "New Event - SIO R.T. Nagar",
              `${notificationData.latestEvents[0]?.title || "Check out the upcoming events"}`,
              "/events"
            );
          }
        }
      }

      previousCountRef.current = notificationData.totalNewCount;
    };

    sendNotifications();
  }, [notificationData]);

  const markAllAsSeen = useCallback(() => {
    const now = new Date().toISOString();
    setLastSeenTimestamp(now);
    lastSeenRef.current = now;
    previousCountRef.current = 0;
  }, []);

  const isLoading = announcementsQuery.isLoading || eventsQuery.isLoading;

  return {
    ...notificationData,
    isLoading,
    markAllAsSeen,
    requestPermission: requestNotificationPermission,
  };
}
