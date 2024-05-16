import { get, writable } from 'svelte/store';
import type { Card } from '../card';

export type Discard = {
	cards: Card[];
};

export const createDiscardStore = () => {
	const store = writable<Discard>({
		cards: []
	});

	function discardCard(card: Card) {
		store.update((state) => {
			state.cards = [...state.cards, card];
			return state;
		});
	}

	function clearDiscard() {
		store.update((state) => {
			state.cards = [];
			return state;
		});
	}

	function getDiscard() {
		return get(store);
	}

	return {
		getDiscard,
		discardCard,
		clearDiscard
	};
};
