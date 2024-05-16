import { describe, it, expect } from 'vitest';
import { createDeckStore, type Deck } from './index';
import { Card, type Face, type Suit } from '../card';


describe('deck test', () => {
	it('generate deck with all cards', () => {
		const deck = createDeckStore();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deck.generateDeck(suits, faces);

		expect(deck.getDeck().cards.length).toBe(52);
	});

	it('shuffle deck', () => {
		const deck = createDeckStore();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deck.generateDeck(suits, faces);
		const originalDeckCards: Card[] = { ...deck.getDeck().cards};
		deck.shuffleDeck();

		expect(deck.getDeck().cards).not.toEqual(originalDeckCards);
	});

	it('draw top card', () => {
		const deck = createDeckStore();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deck.generateDeck(suits, faces);
		let currentDeck: Deck = { ...deck.getDeck()};
		expect(currentDeck.cards.length).toBe(52);

		const topCard: Card = currentDeck.cards[0];
		const drawnCard: Card | null = deck.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deck.getDeck().cards.length).toBe(51);
	});

	it('draw top card on empty deck', () => {
		const deck = createDeckStore();
		const faces: Array<Face> = ['A'];
		const suits: Array<Suit> = ['hearts'];

		deck.generateDeck(suits, faces);
		expect(deck.getDeck().cards.length).toBe(1);

		const topCard: Card = deck.getDeck().cards[0];
		const drawnCard: Card | null = deck.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deck.getDeck().cards.length).toBe(0);

		expect(deck.drawTopCard()).toBeNull()
	});

	it('put card on top', () => {
		const deck = createDeckStore();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts'];

		deck.generateDeck(suits, faces);

		expect(deck.getDeck().cards.length).toEqual(13);

		const card: Card = new Card();
		card.face = 'A';
		card.suit = 'diamonds';

		deck.putCardOnTop(card);

		expect(deck.getDeck().cards[0]).toEqual(card);
		expect(deck.getDeck().cards.length).toEqual(14);

	})
});
