import { ArraySchema, Schema, type } from "@colyseus/schema";
import { Card } from "./Card";

export class Stack extends Schema {
  @type([Card]) stack: ArraySchema<Card> = new ArraySchema();
}
