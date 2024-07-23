import { describe, it, expect } from 'vitest';
import Knight from './knight';
import type { ConsumableInterface } from '$lib/models/items/interfaces';
import PotionOfHealing from '$lib/models/items/consumable/potionOfHealing';

describe('player character knight test', () => {

	it('check deck has 52 cards ', () => {
		const knight = new Knight();
		expect(knight.deck.cards.length).toBe(52);
	});

	it('check player has 20 health ', () => {
		const knight = new Knight();
		expect(knight.getHealthColor()).toBe('bg-green-500');
	});

	it('check player has 15 health ', () => {
		const knight = new Knight();
		knight.currentHealth = 15;
		expect(knight.getHealthColor()).toBe('bg-yellow-500');
	});

	it('check player has 10 health ', () => {
		const knight = new Knight();
		knight.currentHealth = 10;
		expect(knight.getHealthColor()).toBe('bg-orange-500');
	});

	it('check player has 5 health ', () => {
		const knight = new Knight();
		knight.currentHealth = 5;
		expect(knight.getHealthColor()).toBe('bg-red-500');
	});
});
