import { type } from "@colyseus/schema";
import { Card } from "./Card";

export class Creature extends Card {
  @type("boolean") tapped: boolean = false;
  @type("boolean") isSummoningSick: boolean = true;
}
