import { MessageType } from "./MessageType";

export type Message<T> = {
  type: (typeof MessageType)[keyof typeof MessageType];
  namespace: string;
  action: string;
  args: T;
};
