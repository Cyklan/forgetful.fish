import { Message } from "../Message"
import { MessageType } from "../MessageType"

export const EnlargeCubeMessage: Message<"left" | "right"> = {
  action: "enlargecube",
  args: "left",
  type: MessageType.command,
  namespace: "foo"
}