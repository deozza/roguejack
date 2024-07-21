import { describe, it, expect } from 'vitest';
import { Rarities, type RaritiesWeight } from './enums';
import { getRandomItemByWeight } from '.';
import type { ItemTypes } from './types';

describe('items index test', () => {

	const dataprovider_randomItem = [
		{ data : [{rarity: Rarities.common, weight: 100}], expected: Rarities.common },
		{ data : [{rarity: Rarities.uncommon, weight: 100}], expected: Rarities.uncommon },
		{ data : [{rarity: Rarities.rare, weight: 100}], expected: Rarities.rare },
		{ data : [{rarity: Rarities.epic, weight: 100}], expected: Rarities.epic },
		{ data : [{rarity: Rarities.legendary, weight: 100}], expected: Rarities.legendary },
	]


	dataprovider_randomItem.forEach((data) => {
		it('get random item from ' + data.data[0].rarity + ' rarity', () => {
			const item: ItemTypes = getRandomItemByWeight(data.data);
			expect(item.rarity).toBe(data.expected);
		});
	});
});
