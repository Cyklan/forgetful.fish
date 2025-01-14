import type { Land } from "schema";
import { useGame } from "../../hooks/useColyseus";
import { LandPlayMessage } from "communication";

export const playLandAction = (land: Land) => {
  const { me, room } = useGame.getState();

  if (me()?.hasPlayedLand) {
    return;
  }

  room?.send("*", { ...LandPlayMessage, args: land });
};
