import type { FC } from "react";
import type { Land } from "../../../server/src/Schema/Land";
import { Permanent } from "./3DModels/Permanent";
import { getCardAction } from "../actions/util/getCardAction"
import { Mana } from "../../../server/src/Schema/Mana"

export type LandsProps = {
  whos: "mine" | "opponent";
  lands: Land[];
};

const positions = {
  mine: [-650, -250, 0],
  opponent: [-650, 250, 0],
} as const;

export const Lands: FC<LandsProps> = ({ lands, whos }) => {
  const permanents = lands.map((land, i) => (
    <Permanent onClick={() => {
      getCardAction(land, "board", new Mana("blue", 1, land.id))?.()
    }} key={`land-${land.id}`} card={land} positionOffset={i} />
  ))
  return (
    <object3D position={positions[whos]}>
     {permanents} 
    </object3D>
  );
};
