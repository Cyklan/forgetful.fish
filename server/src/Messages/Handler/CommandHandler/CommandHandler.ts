import { Handler, MessageHandlerFunction } from "../Handler";
import { match } from "ts-pattern";
import { StartGameMessage } from "../../general/startGame";
import { logger, logUnknownMessage } from "../../../Logging/Logger";
import { EnlargeCubeMessage } from "../../general/enlargeCube"

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
      .with(EnlargeCubeMessage.action, () => {
        if ((message as typeof EnlargeCubeMessage).args === "left") {
          this.room.state.boxLeftClicked = !this.room.state.boxLeftClicked
        } else {
          this.room.state.boxRightClicked = !this.room.state.boxRightClicked
        }
      })
      .otherwise(() => {
        logUnknownMessage(this.room.roomId, client.sessionId, message, {
          location: "CommandMessageHandler",
        });
      });
  };
}
