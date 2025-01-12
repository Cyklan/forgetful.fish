import { Land } from "../../Schema/Land";
import { LandActions } from "../Handler/Card/LandHandler";
import { Message } from "../Message";
import { MessageNamespace } from "../MessageNamespace"
import { MessageType } from "../MessageType";

export const LandTapMessage: Message<Land> = {
  action: LandActions.tap,
  args: null,
  namespace: MessageNamespace.card,
  type: MessageType.land,
};
