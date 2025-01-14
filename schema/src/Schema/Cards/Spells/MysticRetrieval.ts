import { CollectionSchema } from "@colyseus/schema";
import { Spell } from "../../Spell";
import { Mana } from "../../Mana";

export class MysticRetrieval extends Spell {
  name: string = "Mystic Retrieval";
  superType: "instant" | "sorcery" | "creature" | "land" = "sorcery";
  cost: CollectionSchema<Mana> = new CollectionSchema([
    new Mana("blue", 1),
    new Mana("generic", 3),
  ]);
}
