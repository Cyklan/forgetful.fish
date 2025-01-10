import { Client, Room } from "colyseus";
import { GameState } from "../../Schema/GameState";
import { Message } from "../Message";

export type MessageHandlerFunction = (
  client: Client<any, any>,
  message: Message<unknown>,
) => void;

export abstract class Handler {
  room: Room<GameState>;
  constructor(room: Room<GameState>) {
    this.room = room;
  }

  abstract handleMessage: MessageHandlerFunction;
}
