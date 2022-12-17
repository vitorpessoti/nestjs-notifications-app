import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { Injectable } from "@nestjs/common";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
    constructor(
        private notificationRepository: NotificationRepository
    ) {}

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationRepository.findById(
            notificationId
        );

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.cancel();

        console.log('notification', notification)
        
        await this.notificationRepository.save(notification);
    }
}