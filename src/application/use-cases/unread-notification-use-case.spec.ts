import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { UnreadNotification } from "./unread-notification-use-case";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Unread Notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationRepository);

        const notification = makeNotification({
            readAt: new Date()
        });

        await notificationRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })
})