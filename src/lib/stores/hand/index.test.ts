import { describe, it, expect, beforeEach } from 'vitest';
import { Card } from '../card';
import { handStore } from '.';

describe('hand test', () => {

	beforeEach(() => {
		handStore.clearHand();
	});

	it('add card to hand', () => {
		expect(handStore.getHand().cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().cards.length).toBe(1);
		expect(handStore.getHand().cards[0]).toEqual(card);
	});

	it('remove card from hand', () => {
		expect(handStore.getHand().cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().cards.length).toBe(1);
		expect(handStore.getHand().cards[0]).toEqual(card);

		handStore.removeCard(card);

		expect(handStore.getHand().cards.length).toBe(0);
	});

	it('clear hand', () => {
		expect(handStore.getHand().cards.length).toBe(0);

		const card: Card = new Card('clubs', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().cards.length).toBe(1);
		expect(handStore.getHand().cards[0]).toEqual(card);

		handStore.clearHand();
		expect(handStore.getHand().cards.length).toBe(0);
	});

	it('value changes on add', () => {
		expect(handStore.getHand().value).toBe(0);

		const card: Card = new Card('hearts', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().value).toEqual(11);
	});

	it('value changes on remove', () => {
		expect(handStore.getHand().value).toBe(0);

		let card: Card = new Card('hearts', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().value).toEqual(11);

		card = new Card('hearts', '4');
		handStore.addCard(card);
		expect(handStore.getHand().value).toBe(15);

		handStore.removeCard(card);
		expect(handStore.getHand().value).toBe(11);
	});

	it('value changes on clear', () => {
		expect(handStore.getHand().value).toBe(0);

		let card: Card = new Card('hearts', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().value).toEqual(11);

		card = new Card('hearts', '4');
		handStore.addCard(card);
		expect(handStore.getHand().value).toBe(15);

		handStore.clearHand();
		expect(handStore.getHand().value).toBe(0);
	});

	it('isBusted changes on add', () => {
		expect(handStore.getHand().isBusted).toBe(false);

		const card: Card = new Card('hearts', 'K')
		handStore.addCard(card);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBusted).toBe(false);

		handStore.addCard(card);
		expect(handStore.getHand().value).toBe(20);
		expect(handStore.getHand().isBusted).toBe(false);

		handStore.addCard(card);
		expect(handStore.getHand().value).toBe(30);
		expect(handStore.getHand().isBusted).toBe(true);
	});

	it('isBusted changes on remove', () => {
		expect(handStore.getHand().isBusted).toBe(false);

		const card1: Card = new Card('hearts', 'K')
		handStore.addCard(card1);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBusted).toBe(false);

		let card2: Card = new Card('hearts', 'K')
		handStore.addCard(card2);
		expect(handStore.getHand().value).toBe(20);
		expect(handStore.getHand().isBusted).toBe(false);

		let card3: Card = new Card('hearts', 'K')
		handStore.addCard(card3);
		expect(handStore.getHand().value).toBe(30);
		expect(handStore.getHand().isBusted).toBe(true);

		handStore.removeCard(card3);

		expect(handStore.getHand().value).toBe(20);
		expect(handStore.getHand().isBusted).toBe(false);
	});

	it('isBusted changes on clear', () => {
		expect(handStore.getHand().isBusted).toBe(false);

		const card1: Card = new Card('hearts', 'K')
		handStore.addCard(card1);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBusted).toBe(false);

		let card2: Card = new Card('hearts', 'K');
		handStore.addCard(card2);
		expect(handStore.getHand().value).toBe(20);
		expect(handStore.getHand().isBusted).toBe(false);

		let card3: Card = new Card('hearts', 'K');
		handStore.addCard(card3);
		expect(handStore.getHand().value).toBe(30);
		expect(handStore.getHand().isBusted).toBe(true);

		handStore.clearHand();

		expect(handStore.getHand().value).toBe(0);
		expect(handStore.getHand().isBusted).toBe(false);
	});

	it('isBlackjack changes on add', () => {
		expect(handStore.getHand().isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		handStore.addCard(card1);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		handStore.addCard(card2);
		expect(handStore.getHand().value).toBe(21);
		expect(handStore.getHand().isBlackjack).toBe(true);
	});

	it('isBlackjack changes on remove', () => {
		expect(handStore.getHand().isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		handStore.addCard(card1);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		handStore.addCard(card2);
		expect(handStore.getHand().value).toBe(21);
		expect(handStore.getHand().isBlackjack).toBe(true);

		handStore.removeCard(card2);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBlackjack).toBe(false);
	});

	it('isBlackjack changes on clear', () => {
		expect(handStore.getHand().isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		handStore.addCard(card1);
		expect(handStore.getHand().value).toBe(10);
		expect(handStore.getHand().isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		handStore.addCard(card2);
		expect(handStore.getHand().value).toBe(21);
		expect(handStore.getHand().isBlackjack).toBe(true);

		handStore.clearHand();
		expect(handStore.getHand().value).toBe(0);
		expect(handStore.getHand().isBlackjack).toBe(false);
	});

	it('value changes according to aces count', () => {
		expect(handStore.getHand().value).toBe(0);

		const card: Card = new Card('hearts', 'A');
		handStore.addCard(card);
		expect(handStore.getHand().value).toEqual(11);

		const card2: Card = new Card('hearts', 'A');
		handStore.addCard(card2);
		expect(handStore.getHand().value).toEqual(12);
	});
});
