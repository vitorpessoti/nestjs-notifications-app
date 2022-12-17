import { Module } from "@nestjs/common";
import { SendNotification } from "@application/use-cases/send-notification-use-case";
import { DatabaseModule } from "@infra/database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";
import { CancelNotification } from "@application/use-cases/cancel-notification-use-case";
import { CountRecipientNotifications } from "@application/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@application/use-cases/get-recipient-notifications";
import { ReadNotification } from "@application/use-cases/read-notification-use-case";
import { UnreadNotification } from "@application/use-cases/unread-notification-use-case";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        CancelNotification,
        CountRecipientNotifications,
        GetRecipientNotifications,
        ReadNotification,
        UnreadNotification
    ]
})

export class HttpModule {}