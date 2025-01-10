import { Message } from "../Message";
import { MessageType } from "../MessageType";

export const StartGameMessage: Message<null> = {
  type: MessageType.command,
  namespace: "game",
  action: "start_game",
  args: null,
};
