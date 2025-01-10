import { Schema, type } from "@colyseus/schema";

export class Mana extends Schema {
  @type("string") color: "blue" | "red" | "generic";
  @type("number") amount: number;

  constructor(color: Mana["color"], amount: number) {
    super();
    this.color = color;
    this.amount = amount;
  }
}
