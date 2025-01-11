import { CollectionSchema } from "@colyseus/schema";
import { Land } from "../../Land";
import { Mana } from "../../Mana";

export class Island extends Land {
  name: string = "Island";
  isBasic: boolean = true;
  entersTapped: boolean = false;

  producesQuantity: "or" | "all" = "all";
  produces: CollectionSchema<Mana> = new CollectionSchema([
    new Mana("blue", 1),
  ]);
}
