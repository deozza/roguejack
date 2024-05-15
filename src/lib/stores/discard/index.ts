import type { Card } from "../card";

export class Discard {
    public cards: Card[] = [];

    public discardCard(card: Card): void {
        this.cards = [...this.cards, card];
    }

    public clearDiscard(): void {
        this.cards = [];
    }
}