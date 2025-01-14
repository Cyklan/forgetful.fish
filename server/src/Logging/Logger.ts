import { createLogger, format } from "winston";
import { Console, File } from "winston/lib/winston/transports";
import { Message } from "../../../communication/src/Message/Message";

export const logger = createLogger({
  transports: [
    new File({ filename: process.env.LOG_FILE, format: format.json() }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new Console({
      format: format.simple(),
    }),
  );
}

export const logUnknownMessage = (
  roomId: string,
  clientId: string,
  message: Message<unknown>,
  other_meta: object = {},
) => {
  logger.warn(
    `Received unknown message in ${roomId} sent by ${clientId}`,
    message,
    other_meta,
  );
};
