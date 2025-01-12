import { Schema, type } from "@colyseus/schema";

export class Mana extends Schema {
  @type("string") color:
    | "blue"
    | "red"
    | "green"
    | "white"
    | "black"
    | "generic";
  @type("number") amount: number;
  @type("string") producedBy: string;

  constructor(color: Mana["color"], amount: number, producedBy: string) {
    super();
    this.color = color;
    this.amount = amount;
    this.producedBy = producedBy;
  }
}
