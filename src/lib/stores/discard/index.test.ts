import { describe, it, expect, beforeEach } from 'vitest';
import { Card } from '../card';
import { discardStore } from './index';

describe('discard test', () => {

	beforeEach(() => {
		discardStore.clearDiscard();
	});

	it('add card to discard', () => {
		expect(discardStore.getDiscard().cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		discardStore.discardCard(card);

		expect(discardStore.getDiscard().cards.length).toBe(1);
		expect(discardStore.getDiscard().cards[0]).toEqual(card);
	});

	it('clear discard', () => {
		expect(discardStore.getDiscard().cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		discardStore.discardCard(card);
		expect(discardStore.getDiscard().cards.length).toBe(1);
		expect(discardStore.getDiscard().cards[0]).toEqual(card);

		discardStore.clearDiscard();
		expect(discardStore.getDiscard().cards.length).toBe(0);
	});
});
