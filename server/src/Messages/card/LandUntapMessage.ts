import { Land } from "../../Schema/Land";
import { LandActions } from "../Handler/Card/LandHandler";
import { Message } from "../Message";
import { MessageNamespace } from "../MessageNamespace"
import { MessageType } from "../MessageType";

export const LandUntapMessage: Message<Land> = {
  action: LandActions.untap,
  args: null,
  namespace: MessageNamespace.card,
  type: MessageType.land,
};
