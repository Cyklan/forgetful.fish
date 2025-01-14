import { Land } from "schema";
import { LandAction } from "../../Actions";
import { Message } from "../../../../communication/src/Message/Message";
import { MessageNamespace } from "../../../../communication/src/Message/MessageNamespace";
import { MessageType } from "../../../../communication/src/Message/MessageType";

export const LandUntapMessage: Message<Land> = {
  action: LandAction.untap,
  args: null,
  namespace: MessageNamespace.card,
  type: MessageType.land,
};
