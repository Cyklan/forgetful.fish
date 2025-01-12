import { match } from "ts-pattern"
import { Handler, MessageHandlerFunction } from "../Handler"
import { MessageType } from "../../MessageType"
import { LandHandler } from "./LandHandler"

export class CardPlayHandler extends Handler {
  handleMessage: MessageHandlerFunction = (client, message) => {
    match(message.type)
      .with(MessageType.land, () => {
        new LandHandler(this.room).handleMessage(client, message)
      })
  }
}