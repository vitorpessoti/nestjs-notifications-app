import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification-use-case";

describe('Send Notification', () => {
    it('should be able to send a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const sendNotification = new SendNotification(notificationRepository);

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'recipientId-example'
        });

        expect(notificationRepository.notifications).toHaveLength(1);
        expect(notificationRepository.notifications[0]).toEqual(notification);
    })
})