import { Card } from "../Card";
import { Dandan } from "../Cards/Creatures/Dandan";
import { Island } from "../Cards/Lands/Island";
import { Brainstorm } from "../Cards/Spells/Brainstorm";
import { DiminishingReturn } from "../Cards/Spells/DiminishingReturn";
import { MysticRetrieval } from "../Cards/Spells/MysticRetrieval";

export class Deck {
  cards: Card[];
  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  shuffle() {
    let currentIndex = this.cards.length;
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
  }

  draw(amount: number = 1): Card | Card[] {
    if (amount === 1) {
      return this.cards.pop();
    }

    const cardsToDraw = [];
    for (let i = 0; i < amount; i++) {
      cardsToDraw.push(this.cards.pop());
    }

    return cardsToDraw;
  }

  private initializeDeck() {
    this.cards = [];
    this.addLands();
    this.addInstants();
    this.addSorceries();
    this.addDandans();
  }

  private addLands() {
    this.addCard(Island, 22);
  }

  private addInstants() {
    this.addCard(Brainstorm, 2);
  }

  private addSorceries() {
    this.addCard(DiminishingReturn, 2);
    this.addCard(MysticRetrieval, 2);
  }

  private addDandans() {
    this.addCard(Dandan, 10);
  }

  private addCard(card: new () => Card, amount = 1) {
    for (let i = 0; i < amount; i++) {
      this.cards.push(new card());
    }
  }
}
