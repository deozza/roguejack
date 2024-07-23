import { describe, it, expect } from 'vitest';
import Villager from './villager';
import type { ConsumableInterface } from '$lib/models/items/interfaces';
import PotionOfHealing from '$lib/models/items/consumable/potionOfHealing';

describe('player character villager test', () => {

	it('check deck has 40 cards ', () => {
		const villager = new Villager();
		expect(villager.deck.cards.length).toBe(40);
	});

	it('check player has 20 health ', () => {
		const villager = new Villager();
		expect(villager.getHealthColor()).toBe('bg-green-500');
	});

	it('check player has 15 health ', () => {
		const villager = new Villager();
		villager.currentHealth = 15;
		expect(villager.getHealthColor()).toBe('bg-yellow-500');
	});

	it('check player has 10 health ', () => {
		const villager = new Villager();
		villager.currentHealth = 10;
		expect(villager.getHealthColor()).toBe('bg-orange-500');
	});

	it('check player has 5 health ', () => {
		const villager = new Villager();
		villager.currentHealth = 5;
		expect(villager.getHealthColor()).toBe('bg-red-500');
	});

	it('add item to inventory', () => {
		const villager = new Villager();
		expect(villager.inventory.length).toBe(0);

		const item: ConsumableInterface = new PotionOfHealing();
		villager.addToInventory(item);

		expect(villager.inventory.length).toBe(1);
		expect(villager.inventory[0].technicalName).toBe('potionOfHealing');
	});
});
