import { Alert } from 'react-native';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'promotion' | 'general';
  timestamp: Date;
  read: boolean;
  data?: any;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    this.notifications.unshift(newNotification);
    this.notifyListeners();
    
    // Show immediate alert for important notifications
    if (notification.type === 'booking' || notification.type === 'reminder') {
      Alert.alert(notification.title, notification.message);
    }
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Predefined notification methods for common use cases
  scheduleBookingReminder(bookingDate: string, serviceName: string) {
    this.addNotification({
      title: 'Booking Reminder',
      message: `Your ${serviceName} appointment is tomorrow at ${bookingDate}`,
      type: 'reminder',
    });
  }

  confirmBooking(serviceName: string, date: string) {
    this.addNotification({
      title: 'Booking Confirmed',
      message: `Your ${serviceName} appointment on ${date} has been confirmed`,
      type: 'booking',
    });
  }

  sendPromotion(title: string, message: string) {
    this.addNotification({
      title,
      message,
      type: 'promotion',
    });
  }

  petHealthReminder(petName: string, reminderType: string) {
    this.addNotification({
      title: 'Pet Health Reminder',
      message: `Time for ${petName}'s ${reminderType}`,
      type: 'reminder',
    });
  }
}

export const notificationService = new NotificationService();