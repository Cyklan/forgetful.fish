import { Land } from "../../Schema/Land"
import { LandActions } from "../Handler/Card/LandHandler"
import { Message } from "../Message"
import { MessageNamespace } from "../MessageNamespace"
import { MessageType } from "../MessageType"

export const LandPlayMessage: Message<Land> = {
  action: LandActions.play,
  type: MessageType.land,
  namespace: MessageNamespace.card,
  args: null
}