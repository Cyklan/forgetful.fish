import { ArraySchema, type } from "@colyseus/schema";
import { Card } from "./Card";
import { Mana } from "./Mana";

export class Land extends Card {
  superType: "instant" | "sorcery" | "creature" | "land" = "land";
  @type("boolean") isBasic: boolean;
  @type("boolean") isTapped: boolean = false;
  @type("boolean") entersTapped: boolean;
  @type("boolean") wasPlayedThisTurn: boolean;

  @type("string") producesQuantity: "or" | "all";
  @type([Mana]) produces: ArraySchema<Mana> = new ArraySchema();
  @type([Mana]) produced: ArraySchema<Mana> = new ArraySchema();
}
