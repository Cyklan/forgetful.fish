import { Message } from "../Message";
import { MessageNamespace } from "../MessageNamespace"
import { MessageType } from "../MessageType";

export const StartGameMessage: Message<null> = {
  type: MessageType.command,
  namespace: MessageNamespace.general,
  action: "start_game",
  args: null,
};
