import { Card, type Face, type Suit } from '../card/model';

export class Deck {
	cards: Array<Card> = [];

	generateDeck(suits: Array<Suit>, faces: Array<Face>) {
		this.cards = [];
		let cardId: number = 1;
		suits.forEach((suit: Suit) => {
			faces.forEach((face: Face) => {
				const card: Card = new Card(suit, face);

				this.cards = [...this.cards, card];
				cardId++;
			});
		});
	}

	shuffleDeck() {
		this.cards = this.cards.sort(() => Math.random() - 0.5);
	}

	drawTopCard(): Card | null {
		const card = this.cards[0];
		if (!card) {
			return null;
		}

		this.cards = this.cards.slice(1);

		return card;
	}

	putCardOnTop(card: Card) {
		this.cards = [card, ...this.cards];
	}
}
