import { describe, it, expect } from 'vitest';
import { deckStore, type Deck } from './index';
import { Card, type Face, type Suit } from '../card';

describe('deck test', () => {
	it('generate deck with all cards', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deckStore.generateDeck(suits, faces);

		expect(deckStore.getDeck().cards.length).toBe(52);
	});

	it('shuffle deck', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deckStore.generateDeck(suits, faces);
		const originalDeckCards: Card[] = { ...deckStore.getDeck().cards };
		deckStore.shuffleDeck();

		expect(deckStore.getDeck().cards).not.toEqual(originalDeckCards);
	});

	it('draw top card', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deckStore.generateDeck(suits, faces);
		let currentDeck: Deck = { ...deckStore.getDeck() };
		expect(currentDeck.cards.length).toBe(52);

		const topCard: Card = currentDeck.cards[0];
		const drawnCard: Card | null = deckStore.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deckStore.getDeck().cards.length).toBe(51);
	});

	it('draw top card on empty deck', () => {
		const faces: Array<Face> = ['A'];
		const suits: Array<Suit> = ['hearts'];

		deckStore.generateDeck(suits, faces);
		expect(deckStore.getDeck().cards.length).toBe(1);

		const topCard: Card = deckStore.getDeck().cards[0];
		const drawnCard: Card | null = deckStore.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deckStore.getDeck().cards.length).toBe(0);

		expect(deckStore.drawTopCard()).toBeNull();
	});

	it('put card on top', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts'];
		deckStore.generateDeck(suits, faces);
		expect(deckStore.getDeck().cards.length).toEqual(13);

		const card: Card = new Card('diamonds', 'A');
		deckStore.putCardOnTop(card);
		expect(deckStore.getDeck().cards[0]).toEqual(card);
		expect(deckStore.getDeck().cards.length).toEqual(14);
	});
});
