import { Content } from "./content"
import { Notification } from "./notification"

describe('Notification', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            category: 'social',
            content: new Content('New friendship request!'),
            recipientId: 'example-recipient-id'
        });
        expect(notification).toBeTruthy();
    })
})