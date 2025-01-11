import { CollectionSchema } from "@colyseus/schema";
import { Mana } from "../../Mana";
import { Spell } from "../../Spell";

export class DiminishingReturn extends Spell {
  name: string = "Diminishing Returns";
  superType: "instant" | "sorcery" | "creature" | "land" = "sorcery";
  cost: CollectionSchema<Mana> = new CollectionSchema([
    new Mana("blue", 2),
    new Mana("generic", 2),
  ]);
}
