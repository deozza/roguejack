import { Card, value, type Face, type Suit } from "../card";

export class Deck {
    public cards: Card[] = [];

    public generateDeck(suits: Array<Suit>, faces: Array<Face>): void {
        let cardId: number = 1;
        suits.forEach((suit: Suit) => {
			faces.forEach((face: Face) => {
				const card: Card = new Card();
				card.suit = suit;
                card.face = face;
                card.value = value[face];
                card.id = cardId;

                this.cards = [...this.cards, card];
                cardId++;
			});
		});
    }

    public shuffleDeck(): void {
        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }

    public drawTopCard(): Card | null {
        const card = this.cards[0];
        if (!card) {
            return null;
        }

        this.cards = this.cards.slice(1);
        return card;
    }

    public putCardOnTop(card: Card): void {
        this.cards = [card, ...this.cards];
    }
}