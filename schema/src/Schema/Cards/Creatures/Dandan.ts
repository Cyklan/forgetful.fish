import { ArraySchema } from "@colyseus/schema";
import { Creature } from "../../Creature";
import { Mana } from "../../Mana";

export class Dandan extends Creature {
  name: string = "Dandân";
  cost: ArraySchema<Mana> = new ArraySchema(new Mana("blue", 2));
}
