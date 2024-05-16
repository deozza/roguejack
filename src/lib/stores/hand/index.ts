import { get, writable, type Writable } from 'svelte/store';
import type { Card } from '../card';

export type Hand = {
	cards: Card[];
	value: number;
	isBusted: boolean;
	isBlackjack: boolean;
};

export const createHandStore = () => {
	const store: Writable<Hand> = writable<Hand>({
		cards: [],
		value: 0,
		isBusted: false,
		isBlackjack: false
	});

	function addCard(card: Card) {
		store.update((state) => {
			state.cards = [...state.cards, card];
			state.value = getValue();
			state.isBusted = getIsBusted();
			state.isBlackjack = getIsBlackjack();
			return state;
		});
	}

	function removeCard(card: Card) {
		store.update((state) => {
			state.cards = state.cards.filter((c: Card) => c.id !== card.id);
			state.value = getValue();
			state.isBusted = getIsBusted();
			state.isBlackjack = getIsBlackjack();
			return state;
		});
	}

	function clearHand() {
		store.update((state) => {
			state.cards = [];
			state.value = 0;
			state.isBusted = false;
			state.isBlackjack = false;
			return state;
		});
	}

	function getValue(): number {
		const cards: Card[] = getHand().cards;

		let acesCount: number = 0;
		const aceValue: number = 11;

		let value: number = 0;

		cards.forEach((card: Card) => {
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

	function getIsBusted(): boolean {
		return getHand().value > 21;
	}

	function getIsBlackjack(): boolean {
		const cards: Card[] = getHand().cards;
		let figuresCount: number = 0;
		let acesCount: number = 0;

		cards.forEach((card: Card) => {
			if (card.face === 'A') {
				acesCount++;
			}

			if (['J', 'Q', 'K'].includes(String(card.face))) {
				figuresCount++;
			}
		});

		return cards.length === 2 && figuresCount === 1 && acesCount === 1;
	}

	function getHand(): Hand {
		return get(store);
	}

	return {
		addCard,
		removeCard,
		clearHand,
		getHand
	};
};
