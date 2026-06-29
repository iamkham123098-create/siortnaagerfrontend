import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback, useState } from "react";
import { apiGet, type Paginated, type Announcement, type EventItem } from "@/lib/api";

const LAST_SEEN_KEY = "sio_notifications_last_seen";
const READ_NOTIFICATIONS_KEY = "sio_notifications_read_items";
const NOTIFICATION_PERMISSION_KEY = "sio_notification_permission_asked";

type NotificationType = "announcement" | "event";

interface NotificationItem {
  type: NotificationType;
  id: number;
}

interface NotificationData {
  newAnnouncementsCount: number;
  newEventsCount: number;
  totalNewCount: number;
  latestAnnouncements: Announcement[];
  latestEvents: EventItem[];
}

function getLastSeenTimestamp(): string {
  if (typeof window === "undefined") return new Date().toISOString();
  return localStorage.getItem(LAST_SEEN_KEY) || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
}

function setLastSeenTimestamp(timestamp: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LAST_SEEN_KEY, timestamp);
  }
}

function getReadNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(READ_NOTIFICATIONS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item) => item && typeof item.type === "string" && typeof item.id === "number")
      : [];
  } catch {
    return [];
  }
}

function setReadNotifications(items: NotificationItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(items));
  }
}

function hasReadNotification(items: NotificationItem[], type: NotificationType, id: number) {
  return items.some((item) => item.type === type && item.id === id);
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
  const [readNotifications, setReadNotificationsState] = useState<NotificationItem[]>(() => getReadNotifications());
  const lastSeenRef = useRef(getLastSeenTimestamp());
  const previousCountRef = useRef<number | null>(null);
  const readNotificationsRef = useRef<NotificationItem[]>(readNotifications);

  useEffect(() => {
    readNotificationsRef.current = readNotifications;
  }, [readNotifications]);

  const announcementsQuery = useQuery({
    queryKey: ["announcements-notifications"],
    queryFn: () => apiGet<Paginated<Announcement>>("/announcements/?page=1").catch(() => ({ results: [], count: 0 })),
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  });

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
    const readItems = readNotificationsRef.current;

    const newAnnouncements = announcements.filter(
      (a) => new Date(a.created_at) > new Date(lastSeen) && !hasReadNotification(readItems, "announcement", a.id)
    );
    const newEvents = events.filter(
      (e) => new Date(e.created_at) > new Date(lastSeen) && !hasReadNotification(readItems, "event", e.id)
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

  useEffect(() => {
    const sendNotifications = async () => {
      if (previousCountRef.current === null) {
        previousCountRef.current = notificationData.totalNewCount;
        return;
      }

      if (notificationData.totalNewCount > previousCountRef.current) {
        const hasPermission = await requestNotificationPermission();
        if (hasPermission) {
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

  const markItemAsSeen = useCallback((type: NotificationType, id: number) => {
    const item = { type, id };
    const currentItems = readNotificationsRef.current;
    if (hasReadNotification(currentItems, type, id)) return;

    const updatedItems = [...currentItems, item];
    readNotificationsRef.current = updatedItems;
    setReadNotificationsState(updatedItems);
    setReadNotifications(updatedItems);
  }, []);

  const markAllAsSeen = useCallback(() => {
    const announcements = announcementsQuery.data?.results || [];
    const events = eventsQuery.data?.results || [];
    const currentItems = readNotificationsRef.current;

    const unreadAnnouncements = announcements.filter(
      (a) => new Date(a.created_at) > new Date(lastSeenRef.current) && !hasReadNotification(currentItems, "announcement", a.id)
    );
    const unreadEvents = events.filter(
      (e) => new Date(e.created_at) > new Date(lastSeenRef.current) && !hasReadNotification(currentItems, "event", e.id)
    );

    const newItems = [
      ...unreadAnnouncements.map((a) => ({ type: "announcement" as const, id: a.id })),
      ...unreadEvents.map((e) => ({ type: "event" as const, id: e.id })),
    ];

    const updatedItems = [...currentItems, ...newItems];
    readNotificationsRef.current = updatedItems;
    setReadNotificationsState(updatedItems);
    setReadNotifications(updatedItems);

    const now = new Date().toISOString();
    setLastSeenTimestamp(now);
    lastSeenRef.current = now;
    previousCountRef.current = 0;
  }, [announcementsQuery.data, eventsQuery.data]);

  const isLoading = announcementsQuery.isLoading || eventsQuery.isLoading;

  return {
    ...notificationData,
    isLoading,
    markItemAsSeen,
    markAllAsSeen,
    requestPermission: requestNotificationPermission,
  };
}
