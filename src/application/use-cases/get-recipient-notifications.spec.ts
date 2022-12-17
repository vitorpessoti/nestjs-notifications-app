import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { hasUncaughtExceptionCaptureCallback } from "process";

describe('Get Recipient Notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new GetRecipientNotifications(notificationRepository);

        await notificationRepository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationRepository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationRepository.create(
            makeNotification({ recipientId: 'recipient-2' })
        );

        const { notifications } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        })

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1' }),
            expect.objectContaining({ recipientId: 'recipient-1' }),
        ]))
    });
})