import { ref } from 'vue'

export enum NotificationType {
  Default,
  Error,
  Success,
  Warning,
}

export interface Notification {
  type: NotificationType
  message: string
  description?: string
}

interface NotificationOptions {
  timeout: number
}

const notifications = ref(new Map<string, Notification>())

export function useNotifications() {
  function addNotification(
    notification: Notification,
    options: NotificationOptions = { timeout: 2500 },
  ) {
    const id = crypto.randomUUID()
    notifications.value.set(id, notification)
    if (options.timeout !== 0) {
      setTimeout(() => {
        notifications.value.delete(id)
      }, options.timeout)
    }
  }

  function deleteNotification(id: string) {
    notifications.value.delete(id)
  }

  return { addNotification, deleteNotification, notifications }
}
