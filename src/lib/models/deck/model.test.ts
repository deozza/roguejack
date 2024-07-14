import { describe, it, expect } from 'vitest';
import { Card, type Face, type Suit } from '../card/model';
import { Deck } from './model';

describe('deck model test', () => {
	it('generate deck with all cards', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['heart', 'diamond', 'club', 'spade'];

		const deck: Deck = new Deck();
		deck.generateDeck(suits, faces);

		expect(deck.cards.length).toBe(52);
	});

	it('shuffle deck', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['heart', 'diamond', 'club', 'spade'];

		const deck: Deck = new Deck();
		deck.generateDeck(suits, faces);
		const originalDeckCards: Card[] = { ...deck.cards };
		deck.shuffleDeck();

		expect(deck.cards).not.toEqual(originalDeckCards);
	});

	it('draw top card', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['heart', 'diamond', 'club', 'spade'];

		const deck: Deck = new Deck();
		deck.generateDeck(suits, faces);
		let currentDeck: Deck = { ...deck };
		expect(currentDeck.cards.length).toBe(52);

		const topCard: Card = currentDeck.cards[0];
		const drawnCard: Card | null = deck.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deck.cards.length).toBe(51);
	});

	it('draw top card on empty deck', () => {
		const faces: Array<Face> = ['A'];
		const suits: Array<Suit> = ['heart'];

		const deck: Deck = new Deck();
		deck.generateDeck(suits, faces);
		expect(deck.cards.length).toBe(1);

		const topCard: Card = deck.cards[0];
		const drawnCard: Card | null = deck.drawTopCard();

		expect(drawnCard).toEqual(topCard);
		expect(deck.cards.length).toBe(0);

		expect(deck.drawTopCard()).toBeNull();
	});

	it('put card on top', () => {
		const faces: Array<Face> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const suits: Array<Suit> = ['heart'];

		const deck: Deck = new Deck();
		deck.generateDeck(suits, faces);
		expect(deck.cards.length).toEqual(13);

		const card: Card = new Card('diamond', 'A');
		deck.putCardOnTop(card);
		expect(deck.cards[0]).toEqual(card);
		expect(deck.cards.length).toEqual(14);
	});
});
