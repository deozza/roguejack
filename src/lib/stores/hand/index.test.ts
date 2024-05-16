import { describe, it, expect } from 'vitest';
import { Card, value } from '../card';
import { createHandStore } from '.';

describe('hand test', () => {
	it('add card to hand', () => {
		const hand = createHandStore();
		expect(hand.getHand().cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.getHand().cards.length).toBe(1);
		expect(hand.getHand().cards[0]).toEqual(card);
	});

	it('remove card from hand', () => {
		const hand = createHandStore();
		expect(hand.getHand().cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.getHand().cards.length).toBe(1);
		expect(hand.getHand().cards[0]).toEqual(card);

		hand.removeCard(card);

		expect(hand.getHand().cards.length).toBe(0);
	});

	it('clear hand', () => {
		const hand = createHandStore();
		expect(hand.getHand().cards.length).toBe(0);

		const card: Card = new Card('clubs', 'A');
		hand.addCard(card);
		expect(hand.getHand().cards.length).toBe(1);
		expect(hand.getHand().cards[0]).toEqual(card);

		hand.clearHand();
		expect(hand.getHand().cards.length).toBe(0);
	});

	it('value changes on add', () => {
		const hand = createHandStore();
		expect(hand.getHand().value).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.getHand().value).toEqual(11);
	});

	it('value changes on remove', () => {
		const hand = createHandStore();
		expect(hand.getHand().value).toBe(0);

		let card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.getHand().value).toEqual(11);

		card = new Card('hearts', '4');
		hand.addCard(card);
		expect(hand.getHand().value).toBe(15);

		hand.removeCard(card);
		expect(hand.getHand().value).toBe(11);
	});

	it('value changes on clear', () => {
		const hand = createHandStore();
		expect(hand.getHand().value).toBe(0);

		let card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.getHand().value).toEqual(11);

		card = new Card('hearts', '4');
		hand.addCard(card);
		expect(hand.getHand().value).toBe(15);

		hand.clearHand();
		expect(hand.getHand().value).toBe(0);
	});

	it('isBusted changes on add', () => {
		const hand = createHandStore();
		expect(hand.getHand().isBusted).toBe(false);

		const card: Card = new Card('hearts', 'K')
		hand.addCard(card);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBusted).toBe(false);

		hand.addCard(card);
		expect(hand.getHand().value).toBe(20);
		expect(hand.getHand().isBusted).toBe(false);

		hand.addCard(card);
		expect(hand.getHand().value).toBe(30);
		expect(hand.getHand().isBusted).toBe(true);
	});

	it('isBusted changes on remove', () => {
		const hand = createHandStore();
		expect(hand.getHand().isBusted).toBe(false);

		const card1: Card = new Card('hearts', 'K')
		hand.addCard(card1);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBusted).toBe(false);

		let card2: Card = new Card('hearts', 'K')
		hand.addCard(card2);
		expect(hand.getHand().value).toBe(20);
		expect(hand.getHand().isBusted).toBe(false);

		let card3: Card = new Card('hearts', 'K')
		hand.addCard(card3);
		expect(hand.getHand().value).toBe(30);
		expect(hand.getHand().isBusted).toBe(true);

		hand.removeCard(card3);

		expect(hand.getHand().value).toBe(20);
		expect(hand.getHand().isBusted).toBe(false);
	});

	it('isBusted changes on clear', () => {
		const hand = createHandStore();
		expect(hand.getHand().isBusted).toBe(false);

		const card1: Card = new Card('hearts', 'K')
		hand.addCard(card1);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBusted).toBe(false);

		let card2: Card = new Card('hearts', 'K');
		hand.addCard(card2);
		expect(hand.getHand().value).toBe(20);
		expect(hand.getHand().isBusted).toBe(false);

		let card3: Card = new Card('hearts', 'K');
		hand.addCard(card3);
		expect(hand.getHand().value).toBe(30);
		expect(hand.getHand().isBusted).toBe(true);

		hand.clearHand();

		expect(hand.getHand().value).toBe(0);
		expect(hand.getHand().isBusted).toBe(false);
	});

	it('isBlackjack changes on add', () => {
		const hand = createHandStore();
		expect(hand.getHand().isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.getHand().value).toBe(21);
		expect(hand.getHand().isBlackjack).toBe(true);
	});

	it('isBlackjack changes on remove', () => {
		const hand = createHandStore();
		expect(hand.getHand().isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.getHand().value).toBe(21);
		expect(hand.getHand().isBlackjack).toBe(true);

		hand.removeCard(card2);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBlackjack).toBe(false);
	});

	it('isBlackjack changes on clear', () => {
		const hand = createHandStore();
		expect(hand.getHand().isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.getHand().value).toBe(10);
		expect(hand.getHand().isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.getHand().value).toBe(21);
		expect(hand.getHand().isBlackjack).toBe(true);

		hand.clearHand();
		expect(hand.getHand().value).toBe(0);
		expect(hand.getHand().isBlackjack).toBe(false);
	});

	it('value changes according to aces count', () => {
		const hand = createHandStore();
		expect(hand.getHand().value).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.getHand().value).toEqual(11);

		const card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.getHand().value).toEqual(12);
	});
});
