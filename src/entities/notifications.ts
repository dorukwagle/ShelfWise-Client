export interface Notification {
    notificationId: string;
    title: string;
    body: string;
    icon: string;
    userId: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationResponse {
    data: Notification[];
    info: {
        total: number;
        lastPage: number;
        prev: string | null;
        next: string | null;
    };
}
