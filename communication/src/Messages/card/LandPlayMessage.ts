import { Land } from "schema";
import { LandAction } from "../../Actions";
import { Message } from "../../../../communication/src/Message/Message";
import { MessageNamespace } from "../../../../communication/src/Message/MessageNamespace";
import { MessageType } from "../../../../communication/src/Message/MessageType";

export const LandPlayMessage: Message<Land> = {
  action: LandAction.play,
  type: MessageType.land,
  namespace: MessageNamespace.card,
  args: null,
};
