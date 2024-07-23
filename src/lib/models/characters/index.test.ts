import { describe, it, expect } from 'vitest';
import Rat from './enemies/standard/rat';
import { checkCharacterIsForEnnemy, DefaultCharacter } from '.';
import Knight from './players/knight';
import type { ConsumableInterface } from '../items/interfaces';
import PotionOfHealing from '../items/consumable/potionOfHealing';

describe('global character test', () => {

	it('check rat is an enemy ', () => {
		const rat = new Rat();
		expect(checkCharacterIsForEnnemy(rat)).toBeTruthy();
	});

	it('check knight is an player ', () => {
		const knight = new Knight();
		expect(checkCharacterIsForEnnemy(knight)).toBeFalsy();
	});


	it('add item to inventory', () => {
		const character = new DefaultCharacter();
		expect(character.inventory.length).toBe(0);

		const item: ConsumableInterface = new PotionOfHealing();
		character.addToInventory(item);

		expect(character.inventory.length).toBe(1);
		expect(character.inventory[0].technicalName).toBe('potionOfHealing');
	});

	it('remove item from inventory', () => {
		const character = new DefaultCharacter();
		expect(character.inventory.length).toBe(0);

		const item1: ConsumableInterface = new PotionOfHealing();
		character.addToInventory(item1);

		const item2: ConsumableInterface = new PotionOfHealing();
		character.addToInventory(item2);

		expect(character.inventory.length).toBe(2);
		expect(character.inventory).toStrictEqual([item1, item2]);

		character.removeItemFromInventory(item1);
		expect(character.inventory.length).toBe(1)
		expect(character.inventory).toStrictEqual([item2]);
	});

});
