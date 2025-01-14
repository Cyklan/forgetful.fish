import { Message } from "../../../../communication/src/Message/Message";
import { MessageNamespace } from "../../../../communication/src/Message/MessageNamespace"
import { MessageType } from "../../../../communication/src/Message/MessageType";

export const StartGameMessage: Message<null> = {
  type: MessageType.command,
  namespace: MessageNamespace.general,
  action: "start_game",
  args: null,
};
