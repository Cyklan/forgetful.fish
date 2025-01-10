import { Client, Room } from "colyseus";
import { GameState } from "../../Schema/GameState";
import { match } from "ts-pattern";
import { Message } from "../Message";
import { Handler, MessageHandlerFunction } from "./Handler";
import { MessageType } from "../MessageType";
import { CommandHandler } from "./CommandHandler/CommandHandler";
import { logger, logUnknownMessage } from "../../Logging/Logger";

export class MessageHandler extends Handler {
  handleMessage: MessageHandlerFunction = (client, message) => {
    match(message.type)
      .with(MessageType.command, () => {
        new CommandHandler(this.room).handleMessage(client, message);
      })
      .otherwise(() => {
        logUnknownMessage(this.room.roomId, client.sessionId, message, {
          location: "GlobalMessageHandler",
        });
      });
  };
}
