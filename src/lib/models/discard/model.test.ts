import { describe, it, expect } from 'vitest';
import { Card } from '$lib/models/card/model';
import { Discard } from '$lib/models/discard/model';

describe('discard model test', () => {
	it('add card to discard', () => {
		const discard: Discard = new Discard();
		expect(discard.cards.length).toBe(0);

		const card: Card = new Card('heart', 'A');
		discard.discardCard(card);

		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);
	});

	it('clear discard', () => {
		const discard: Discard = new Discard();
		expect(discard.cards.length).toBe(0);

		const card: Card = new Card('heart', 'A');
		discard.discardCard(card);
		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);

		discard.clearDiscard();
		expect(discard.cards.length).toBe(0);
	});

	it('draw top card from discard', () => {
		const discard: Discard = new Discard();
		expect(discard.cards.length).toBe(0);

		const card: Card = new Card('heart', 'A');
		discard.discardCard(card);
		expect(discard.cards.length).toBe(1);
		expect(discard.cards[0]).toEqual(card);

		const drawnCard: Card | null = discard.drawTopCard();
		expect(drawnCard).toEqual(card);
		expect(discard.cards.length).toBe(0);
	});
});
