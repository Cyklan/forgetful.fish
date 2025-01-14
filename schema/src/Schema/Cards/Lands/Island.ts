import { ArraySchema } from "@colyseus/schema";
import { Land } from "../../Land";
import { Mana } from "../../Mana";

export class Island extends Land {
  name: string = "Island";
  isBasic: boolean = true;
  entersTapped: boolean = false;

  producesQuantity: "or" | "all" = "all";
  produces: ArraySchema<Mana> = new ArraySchema(new Mana("blue", 1, this.id));
}
