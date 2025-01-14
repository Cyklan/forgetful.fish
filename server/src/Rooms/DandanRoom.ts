import { Client, Room } from "colyseus";
import { GameState } from "schema";
import { ExtractUserData, ExtractAuthData } from "@colyseus/core/build/Room";
import { MessageHandler } from "../Messages/Handler/MessageHandler";
import { logger } from "../Logging/Logger";

export class DandanRoom extends Room<GameState> {
  maxClients: number = 2;

  onCreate(_options: any): void | Promise<any> {
    logger.info(`Room ${this.roomId} was created`);
    this.setState(new GameState());

    const messageHandler = new MessageHandler(this);

    this.onMessage("*", messageHandler.handleMessage);
  }

  onJoin(
    client: Client<
      ExtractUserData<this["clients"]>,
      ExtractAuthData<this["clients"]>
    >,
    _options?: any,
    _auth?: ExtractAuthData<this["clients"]>
  ): void | Promise<any> {
    logger.info(`Player ${client.sessionId} joined room ${this.roomId}`);
    this.state.addPlayer(client.sessionId);
  }

  onLeave(
    client: Client<
      ExtractUserData<this["clients"]>,
      ExtractAuthData<this["clients"]>
    >,
    onPurpose: boolean
  ): void | Promise<any> {
    if (onPurpose) {
      logger.info(
        `Player ${client.sessionId} disconnected from ${this.roomId}`
      );
    } else {
      logger.info(`Player ${client.sessionId} lost connection`);
    }
    this.allowReconnection(client, 60);
  }

  onDispose(): void | Promise<any> {
    logger.info(`Room ${this.roomId} was closed`);
  }
}
