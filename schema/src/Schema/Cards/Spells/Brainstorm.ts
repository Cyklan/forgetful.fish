import { CollectionSchema } from "@colyseus/schema";
import { Mana } from "../../Mana";
import { Spell } from "../../Spell";

export class Brainstorm extends Spell {
  superType: "instant" | "sorcery" | "creature" | "land" = "instant";
  name: string = "Brainstorm";
  cost: CollectionSchema<Mana> = new CollectionSchema([new Mana("blue", 1)]);
}
