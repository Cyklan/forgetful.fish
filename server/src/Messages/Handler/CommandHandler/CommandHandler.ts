import { Handler, MessageHandlerFunction } from "../Handler";
import { match } from "ts-pattern";
import { StartGameMessage } from "communication";
import { logger, logUnknownMessage } from "../../../Logging/Logger";

export class CommandHandler extends Handler {
  handleMessage: MessageHandlerFunction = (client, message) => {
    match(message.action)
      .with(StartGameMessage.action, () => {
        if (
          this.room.locked &&
          client.sessionId === this.room.state.player1.sessionId &&
          !this.room.state.gameHasStarted
        ) {
          this.room.state.startGame();
          logger.info(`Game ${this.room.roomId} started`);
        }
      })
      .otherwise(() => {
        logUnknownMessage(this.room.roomId, client.sessionId, message, {
          location: "CommandMessageHandler",
        });
      });
  };
}
