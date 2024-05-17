import { Card } from '../card/model';

export class Discard {
	cards: Array<Card> = [];

	discardCard(card: Card) {
		this.cards = [...this.cards, card];
	}

	clearDiscard() {
		this.cards = [];
	}
}
