import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { ReadNotification } from "./read-notification-use-case";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Read Notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationRepository);

        const notification = makeNotification();

        await notificationRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].readAt).toBeDefined();
    });

    it('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })
})