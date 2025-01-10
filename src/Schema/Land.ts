import { CollectionSchema, type } from "@colyseus/schema";
import { Card } from "./Card";
import { Mana } from "./Mana";

export class Land extends Card {
  superType: "instant" | "sorcery" | "creature" | "land" = "land";
  @type("boolean") isBasic: boolean;
  @type("boolean") isTapped: boolean = false;
  @type("boolean") entersTapped: boolean;

  @type("string") producesQuantity: "or" | "all";
  @type([Mana]) produces: CollectionSchema<Mana> = new CollectionSchema();
}
