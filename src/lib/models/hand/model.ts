import { Card } from '$lib/models/card/model';

export class Hand {
	cards: Card[] = [];
	value: number = 0;
	isBusted: boolean = false;
	isBlackjack: boolean = false;

	public addCard(card: Card): void {
		this.cards = [...this.cards, card];
		this.value = this.getValue();
		this.isBusted = this.getIsBusted();
		this.isBlackjack = this.getIsBlackjack();
	}

	public removeCard(card: Card): void {
		this.cards = this.cards.filter((c: Card) => c.id !== card.id);
		this.value = this.getValue();
		this.isBusted = this.getIsBusted();
		this.isBlackjack = this.getIsBlackjack();
	}

	public clearHand(): void {
		this.cards = [];
		this.value = 0;
		this.isBusted = false;
		this.isBlackjack = false;
	}

	public getValue(): number {
		let acesCount: number = 0;
		const aceValue: number = 11;

		let value: number = 0;

		this.cards.forEach((card: Card) => {
			if (card.face === 'A') {
				acesCount++;
			} else {
				value += Number(card.value);
			}
		});

		for (let i: number = 1; i <= acesCount; i++) {
			if (value + aceValue > 21) {
				value += 1;
			} else {
				value += aceValue;
			}
		}

		return value;
	}

	public getIsBusted(): boolean {
		return this.getValue() > 21;
	}

	public getIsBlackjack(): boolean {
		let figuresCount: number = 0;
		let acesCount: number = 0;

		this.cards.forEach((card: Card) => {
			if (card.face === 'A') {
				acesCount++;
			}

			if (['J', 'Q', 'K'].includes(String(card.face))) {
				figuresCount++;
			}
		});

		return this.cards.length === 2 && figuresCount === 1 && acesCount === 1;
	}
}
