import { ArraySchema, filter, Schema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { Card } from "./Card";
import { Stack } from "./Stack";
import { Deck } from "./Unsynced/Deck";
import type { Client } from "colyseus";

export enum GamePhase {
  Beginning,
  Main1,
  Combat,
  Main2,
  End,
}

export class GameState extends Schema {
  @type("string") roomPassword?: string;

  @type(Player) player1: Player;
  @type(Player) player2: Player;

  @filter(function (this: GameState, client: Client) {
    return this.player1.sessionId === client.sessionId;
  })
  @type("boolean")
  isLobbyHost: boolean = true;

  @type("boolean") gameHasStarted: boolean = false;

  @type([Card]) graveyard: ArraySchema<Card> = new ArraySchema();
  @type([Card]) exile: ArraySchema<Card> = new ArraySchema();
  @type(Stack) stack: Stack = new Stack();
  @type("number") currentPhase = 0;
  deck: Deck;

  addPlayer(sessionId: string) {
    if (!this.player1) {
      this.player1 = new Player(sessionId);
      this.player1.isActivePlayer = true;
      return;
    }

    this.player2 = new Player(sessionId);
  }

  advancePhase() {
    this.currentPhase += 1;
    if (this.currentPhase === GamePhase.End) {
      // TODO: do player cleanup
      // sync to players, then advance to next turn
      this.advancePhase();
    }

    if (this.currentPhase > GamePhase.End) {
      this.changeTurn();
    }
  }

  changeTurn() {
    this.currentPhase = GamePhase.Beginning;
    if (this.player1.isActivePlayer) {
      this.player1.isActivePlayer = false;
      this.player2.isActivePlayer = true;
      return;
    }

    this.player2.isActivePlayer = false;
    this.player1.isActivePlayer = true;

    // todo: do untap step
  }

  startGame() {
    this.determineStartingPlayer();
    this.deck = new Deck();
    this.player1.hand = new ArraySchema(...(this.deck.draw(7) as Card[]));
    this.player2.hand = new ArraySchema(...(this.deck.draw(7) as Card[]));

    this.player1.updateCardsInHand();
    this.player2.updateCardsInHand();
    this.gameHasStarted = true;
  }

  private determineStartingPlayer() {
    if (Math.random() > 0.5) {
      this.player1.isActivePlayer = false;
      this.player2.isActivePlayer = true;
      return;
    }

    this.player1.isActivePlayer = true;
    this.player2.isActivePlayer = false;
  }
}
