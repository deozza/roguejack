import { describe, it, expect } from 'vitest';
import { Card, value } from '../card';
import { createDiscardStore } from './index';


describe('discard test', () => {
	it('add card to discard', () => {
		const discard = createDiscardStore();
		expect(discard.getDiscard().cards.length).toBe(0);
		
		const card: Card = new Card();
		card.face = 'A';
		card.suit = 'hearts';
		card.value = value['A'];
		card.id = 1;

		discard.discardCard(card);

		expect(discard.getDiscard().cards.length).toBe(1);
		expect(discard.getDiscard().cards[0]).toEqual(card);
	});

	it('clear discard', () => {
		const discard = createDiscardStore();
		expect(discard.getDiscard().cards.length).toBe(0);
		
		const card: Card = new Card();
		card.face = 'A';
		card.suit = 'hearts';
		card.value = value['A'];
		card.id = 1;

		discard.discardCard(card);

		expect(discard.getDiscard().cards.length).toBe(1);
		expect(discard.getDiscard().cards[0]).toEqual(card);

		discard.clearDiscard();

		expect(discard.getDiscard().cards.length).toBe(0);
	});

	
});
