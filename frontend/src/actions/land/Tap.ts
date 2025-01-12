import type { Land } from "../../../../server/src/Schema/Land";
import { useGame } from "../../hooks/useColyseus";
import { LandTapMessage } from "../../../../server/src/Messages/card/LandTapMessage";
import type { Mana } from "../../../../server/src/Schema/Mana";

export const tapLandAction = (land: Land, produces: Mana[]) => {
  const { room } = useGame.getState();

  if (land.isTapped) {
    return;
  }

  room?.send("*", { ...LandTapMessage, args: { ...land, produces }, });
};
