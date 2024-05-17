import { describe, it, expect } from 'vitest';
import { Card } from '../card/model';
import { Hand } from './model';

describe('hand model test', () => {
	it('add card to hand', () => {
		const hand: Hand = new Hand();
		expect(hand.cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.cards.length).toBe(1);
		expect(hand.cards[0]).toEqual(card);
	});

	it('remove card from hand', () => {
		const hand: Hand = new Hand();
		expect(hand.cards.length).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.cards.length).toBe(1);
		expect(hand.cards[0]).toEqual(card);

		hand.removeCard(card);

		expect(hand.cards.length).toBe(0);
	});

	it('clear hand', () => {
		const hand: Hand = new Hand();
		expect(hand.cards.length).toBe(0);

		const card: Card = new Card('clubs', 'A');
		hand.addCard(card);
		expect(hand.cards.length).toBe(1);
		expect(hand.cards[0]).toEqual(card);

		hand.clearHand();
		expect(hand.cards.length).toBe(0);
	});

	it('value changes on add', () => {
		const hand: Hand = new Hand();
		expect(hand.value).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.value).toEqual(11);
	});

	it('value changes on remove', () => {
		const hand: Hand = new Hand();
		expect(hand.value).toBe(0);

		let card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.value).toEqual(11);

		card = new Card('hearts', '4');
		hand.addCard(card);
		expect(hand.value).toBe(15);

		hand.removeCard(card);
		expect(hand.value).toBe(11);
	});

	it('value changes on clear', () => {
		const hand: Hand = new Hand();
		expect(hand.value).toBe(0);

		let card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.value).toEqual(11);

		card = new Card('hearts', '4');
		hand.addCard(card);
		expect(hand.value).toBe(15);

		hand.clearHand();
		expect(hand.value).toBe(0);
	});

	it('isBusted changes on add', () => {
		const hand: Hand = new Hand();
		expect(hand.isBusted).toBe(false);

		const card: Card = new Card('hearts', 'K');
		hand.addCard(card);
		expect(hand.value).toBe(10);
		expect(hand.isBusted).toBe(false);

		hand.addCard(card);
		expect(hand.value).toBe(20);
		expect(hand.isBusted).toBe(false);

		hand.addCard(card);
		expect(hand.value).toBe(30);
		expect(hand.isBusted).toBe(true);
	});

	it('isBusted changes on remove', () => {
		const hand: Hand = new Hand();
		expect(hand.isBusted).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.value).toBe(10);
		expect(hand.isBusted).toBe(false);

		let card2: Card = new Card('hearts', 'K');
		hand.addCard(card2);
		expect(hand.value).toBe(20);
		expect(hand.isBusted).toBe(false);

		let card3: Card = new Card('hearts', 'K');
		hand.addCard(card3);
		expect(hand.value).toBe(30);
		expect(hand.isBusted).toBe(true);

		hand.removeCard(card3);

		expect(hand.value).toBe(20);
		expect(hand.isBusted).toBe(false);
	});

	it('isBusted changes on clear', () => {
		const hand: Hand = new Hand();
		expect(hand.isBusted).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.value).toBe(10);
		expect(hand.isBusted).toBe(false);

		let card2: Card = new Card('hearts', 'K');
		hand.addCard(card2);
		expect(hand.value).toBe(20);
		expect(hand.isBusted).toBe(false);

		let card3: Card = new Card('hearts', 'K');
		hand.addCard(card3);
		expect(hand.value).toBe(30);
		expect(hand.isBusted).toBe(true);

		hand.clearHand();

		expect(hand.value).toBe(0);
		expect(hand.isBusted).toBe(false);
	});

	it('isBlackjack changes on add', () => {
		const hand: Hand = new Hand();
		expect(hand.isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.value).toBe(10);
		expect(hand.isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.value).toBe(21);
		expect(hand.isBlackjack).toBe(true);
	});

	it('isBlackjack changes on remove', () => {
		const hand: Hand = new Hand();
		expect(hand.isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.value).toBe(10);
		expect(hand.isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.value).toBe(21);
		expect(hand.isBlackjack).toBe(true);

		hand.removeCard(card2);
		expect(hand.value).toBe(10);
		expect(hand.isBlackjack).toBe(false);
	});

	it('isBlackjack changes on clear', () => {
		const hand: Hand = new Hand();
		expect(hand.isBlackjack).toBe(false);

		const card1: Card = new Card('hearts', 'K');
		hand.addCard(card1);
		expect(hand.value).toBe(10);
		expect(hand.isBlackjack).toBe(false);

		let card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.value).toBe(21);
		expect(hand.isBlackjack).toBe(true);

		hand.clearHand();
		expect(hand.value).toBe(0);
		expect(hand.isBlackjack).toBe(false);
	});

	it('value changes according to aces count', () => {
		const hand: Hand = new Hand();
		expect(hand.value).toBe(0);

		const card: Card = new Card('hearts', 'A');
		hand.addCard(card);
		expect(hand.value).toEqual(11);

		const card2: Card = new Card('hearts', 'A');
		hand.addCard(card2);
		expect(hand.value).toEqual(12);
	});
});
