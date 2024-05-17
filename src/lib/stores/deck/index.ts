import { get, writable } from 'svelte/store';
import { Card, value, type Face, type Suit } from '../card';

export type Deck = {
	cards: Card[];
};

const createDeckStore = () => {
	const store = writable<Deck>({
		cards: []
	});

	function generateDeck(suits: Array<Suit>, faces: Array<Face>) {
		store.update((state) => {
			state.cards = [];
			let cardId: number = 1;
			suits.forEach((suit: Suit) => {
				faces.forEach((face: Face) => {
					const card: Card = new Card(suit, face);

					state.cards = [...state.cards, card];
					cardId++;
				});
			});

			return state;
		});
	}

	function shuffleDeck() {
		store.update((state) => {
			state.cards = state.cards.sort(() => Math.random() - 0.5);
			return state;
		});
	}

	function drawTopCard(): Card | null {
		const card = getDeck().cards[0];
		if (!card) {
			return null;
		}

		store.update((state) => {
			state.cards = state.cards.slice(1);
			return state;
		});

		return card;
	}

	function putCardOnTop(card: Card) {
		store.update((state) => {
			state.cards = [card, ...state.cards];
			return state;
		});
	}

	function getDeck(): Deck {
		return get(store);
	}

	return {
		getDeck,
		generateDeck,
		shuffleDeck,
		drawTopCard,
		putCardOnTop
	};
};

export const deckStore = createDeckStore();