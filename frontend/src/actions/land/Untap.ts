import type { Land } from "../../../../server/src/Schema/Land";
import { useGame } from "../../hooks/useColyseus";
import { LandUntapMessage } from "../../../../server/src/Messages/card/LandUntapMessage";
import type { Mana } from "../../../../server/src/Schema/Mana";

export const untapLandAction = (land: Land, produced: Mana[]) => {
  const { room } = useGame.getState();

  if (!land.isTapped) {
    return;
  }

  room?.send("*", { ...LandUntapMessage, args: { ...land, produced }, });
};
