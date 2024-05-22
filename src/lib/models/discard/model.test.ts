import { describe, it, expect, beforeEach } from 'vitest';
import { Card } from '../card/model';
import { Discard } from './model';

describe('discard model test', () => {
	it('add card to discard', () => {
		const discard: Discard = new Discard();
		expect(discard.cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		discard.discardCard(card);

		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);
	});

	it('clear discard', () => {
		const discard: Discard = new Discard();
		expect(discard.cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		discard.discardCard(card);
		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);

		discard.clearDiscard();
		expect(discard.cards.length).toBe(0);
	});
});
