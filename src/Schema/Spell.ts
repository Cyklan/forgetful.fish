import { Card } from "./Card";
import { CollectionSchema, type } from "@colyseus/schema";
import { Mana } from "./Mana";

export class Spell extends Card {
  @type([Mana]) cost: CollectionSchema<Mana> = new CollectionSchema();
}
