import { describe, it, expect } from 'vitest';
import { Card, Face, Suit, value } from '../card';
import { Discard } from './index';


describe('discard test', () => {
	it('add card to discard', () => {
		const discard = new Discard();
		expect(discard.cards.length).toBe(0);
		
		const card = new Card();
		card.face = 'A';
		card.suit = 'hearts';
		card.value = value['A'];
		card.id = 1;

		discard.discardCard(card);

		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);
	});

	it('clear discard', () => {
		const discard = new Discard();
		expect(discard.cards.length).toBe(0);
		
		const card = new Card();
		card.face = 'A';
		card.suit = 'hearts';
		card.value = value['A'];
		card.id = 1;

		discard.discardCard(card);

		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);

		discard.clearDiscard();

		expect(discard.cards.length).toBe(0);
	});

	
});
