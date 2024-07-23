import { describe, it, expect } from 'vitest';
import Necromancer from './necromancer';
import PotionOfHealing from '$lib/models/items/consumable/potionOfHealing';
import type { ConsumableInterface } from '$lib/models/items/interfaces';

describe('player character necromancer test', () => {

	it('check deck has 52 cards ', () => {
		const necromancer = new Necromancer();
		expect(necromancer.deck.cards.length).toBe(52);
	});

	it('check player has 15 health ', () => {
		const necromancer = new Necromancer();
		expect(necromancer.getHealthColor()).toBe('bg-green-500');
	});

	it('check player has 9 health ', () => {
		const necromancer = new Necromancer();
		necromancer.currentHealth = 9;
		expect(necromancer.getHealthColor()).toBe('bg-yellow-500');
	});

	it('check player has 6 health ', () => {
		const necromancer = new Necromancer();
		necromancer.currentHealth = 6;
		expect(necromancer.getHealthColor()).toBe('bg-orange-500');
	});

	it('check player has 3 health ', () => {
		const necromancer = new Necromancer();
		necromancer.currentHealth = 3;
		expect(necromancer.getHealthColor()).toBe('bg-red-500');
	});

	it('add item to inventory', () => {
		const necromancer = new Necromancer();
		expect(necromancer.inventory.length).toBe(0);

		const item: ConsumableInterface = new PotionOfHealing();
		necromancer.addToInventory(item);

		expect(necromancer.inventory.length).toBe(1);
		expect(necromancer.inventory[0].technicalName).toBe('potionOfHealing');
	});
});
