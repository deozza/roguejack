import { describe, it, expect } from 'vitest';
import { Deck } from './index';
import { Card, Face, Suit } from '../card';


describe('deck test', () => {
	it('generate deck with all cards', () => {
		const deck = new Deck();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deck.generateDeck(suits, faces);

		expect(deck.cards.length).toBe(52);
	});

	it('shuffle deck', () => {
		const deck = new Deck();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deck.generateDeck(suits, faces);
		const originalDeck = [...deck.cards];
		deck.shuffleDeck();

		expect(deck.cards).not.toEqual(originalDeck);
	});

	it('draw top card', () => {
		const deck = new Deck();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts', 'diamonds', 'clubs', 'spades'];

		deck.generateDeck(suits, faces);
		expect(deck.cards.length).toBe(52);

		const topCard = deck.cards[0];
		const drawnCard = deck.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deck.cards.length).toBe(51);
	});

	it('draw top card on empty deck', () => {
		const deck = new Deck();
		const faces: Array<Face> = ['A'];
		const suits: Array<Suit> = ['hearts'];

		deck.generateDeck(suits, faces);
		expect(deck.cards.length).toBe(1);

		const topCard = deck.cards[0];
		const drawnCard = deck.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deck.cards.length).toBe(0);

		expect(deck.drawTopCard()).toBeNull()
	});

	it('put card on top', () => {
		const deck = new Deck();
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['hearts'];

		deck.generateDeck(suits, faces);

		expect(deck.cards.length).toEqual(13);

		const card = new Card();
		card.face = 'A';
		card.suit = 'diamonds';

		deck.putCardOnTop(card);

		expect(deck.cards[0]).toEqual(card);
		expect(deck.cards.length).toEqual(14);

	})
});
