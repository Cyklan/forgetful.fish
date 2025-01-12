import { ArraySchema, type } from "@colyseus/schema";
import { Card } from "./Card";
import { Mana } from "./Mana";

export class Creature extends Card {
  @type("boolean") isTapped: boolean = false;
  @type("boolean") isSummoningSick: boolean = true;

  @type([Mana]) cost: ArraySchema<Mana> = new ArraySchema();
}
