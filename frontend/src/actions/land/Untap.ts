import type { Land, Mana } from "schema";
import { useGame } from "../../hooks/useColyseus";
import { LandUntapMessage } from "communication";

export const untapLandAction = (land: Land, produced: Mana[]) => {
  const { room } = useGame.getState();

  if (!land.isTapped) {
    return;
  }

  room?.send("*", { ...LandUntapMessage, args: { ...land, produced } });
};
