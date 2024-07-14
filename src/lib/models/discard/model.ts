import { Card } from '$lib/models/card/model';

export class Discard {
	cards: Array<Card> = [];

	discardCard(card: Card) {
		this.cards = [...this.cards, card];
	}

	drawTopCard(): Card | null {
		const card = this.cards[0];
		if (!card) {
			return null;
		}

		this.cards = this.cards.slice(1);

		return card;
	}

	clearDiscard() {
		this.cards = [];
	}
}
