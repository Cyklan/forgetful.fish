import { ArraySchema, filter, Schema, type } from "@colyseus/schema";
import { Creature } from "./Creature";
import { Land } from "./Land";
import { Card } from "./Card";
import { Client } from "colyseus";

export class Player extends Schema {
  @type("string") sessionId: string;

  @type("number") hp = 5;
  @type([Creature]) board: ArraySchema<Creature> = new ArraySchema();
  @type([Land]) lands: ArraySchema<Land> = new ArraySchema();

  @filter(function (this: Player, client: Client) {
    return this.sessionId === client.sessionId;
  })
  @type([Card])
  hand: ArraySchema<Card> = new ArraySchema();

  @type("boolean") isActivePlayer: boolean;
  @type("boolean") hasPriority: boolean;

  constructor(sessionId: string) {
    super();
    this.sessionId = sessionId;
  }
}
