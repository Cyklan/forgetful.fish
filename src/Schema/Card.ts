import { Schema, type } from "@colyseus/schema";
import { createId } from "@paralleldrive/cuid2";

export class Card extends Schema {
  @type("string") id: string = createId();
  @type("string") name: string;
  @type("string") superType: "instant" | "sorcery" | "creature" | "land";
}
