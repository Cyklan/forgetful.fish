import type { Land } from "../../../../server/src/Schema/Land";
import { useGame } from "../../hooks/useColyseus";
import { LandPlayMessage } from "../../../../server/src/Messages/card/LandPlayMessage";

export const playLandAction = (land: Land) => {
  const { me, room } = useGame.getState();

  if (me()?.hasPlayedLand) {
    return;
  }

  room?.send("*", { ...LandPlayMessage, args: land });
};
