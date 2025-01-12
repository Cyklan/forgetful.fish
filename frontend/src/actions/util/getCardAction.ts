import type { Card } from "../../../../server/src/Schema/Card";
import type { Land } from "../../../../server/src/Schema/Land";
import { playLandAction } from "../land/Play";
import { tapLandAction } from "../land/Tap";
import { untapLandAction } from "../land/Untap";

export type CardLocation = "hand" | "board" | "gy" | "exile";

export function getCardAction(
  card: Card,
  location: CardLocation,
  ...args: any[]
) {
  if (card.superType === "land") {
    return getLandAction(card as Land, location, args);
  }

  return () => {};
}

function getLandAction(card: Land, location: CardLocation, args: any[]) {
  if (location === "hand") {
    return () => playLandAction(card);
  }

  if (location === "board") {
    if (card.isTapped) {
      return () => untapLandAction(card, args);
    }

    return () => tapLandAction(card, args);
  }
}
