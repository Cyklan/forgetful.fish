import type { Land, Mana } from "schema";
import { useGame } from "../../hooks/useColyseus";
import { LandTapMessage } from "communication";

export const tapLandAction = (land: Land, produces: Mana[]) => {
  const { room } = useGame.getState();

  if (land.isTapped) {
    return;
  }

  room?.send("*", { ...LandTapMessage, args: { ...land, produces } });
};
