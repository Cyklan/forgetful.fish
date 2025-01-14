import { match } from "ts-pattern";
import { Handler, MessageHandlerFunction } from "./Handler";
import { CommandHandler } from "./CommandHandler/CommandHandler";
import { logUnknownMessage } from "../../Logging/Logger";
import { CardPlayHandler } from "./Card/CardPlayHandler"
import { MessageNamespace } from "../../../../communication/src/Message/MessageNamespace"

export class MessageHandler extends Handler {
  handleMessage: MessageHandlerFunction = (client, message) => {
    match(message.namespace)
      .with(MessageNamespace.general, () => {
        new CommandHandler(this.room).handleMessage(client, message);
      })
      .with(MessageNamespace.card, () => {
        new CardPlayHandler(this.room).handleMessage(client, message);
      })
      .otherwise(() => {
        logUnknownMessage(this.room.roomId, client.sessionId, message, {
          location: "GlobalMessageHandler",
        });
      });
  };
}
