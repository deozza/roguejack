import { describe, it, expect } from 'vitest';
import { Character } from './index';

describe('character test', () => {
	it('character takes normal damage amount', () => {
		const character = new Character();
		character.takeDamage(5);

		expect(character.currentHealth).toBe(5);
	});

	it('character takes more damage than health', () => {
		const character = new Character();
		character.takeDamage(15);

		expect(character.currentHealth).toBe(0);
	});

	it('character heals normal amount', () => {
		const character = new Character();
		character.currentHealth = 5;
		character.heal(5);

		expect(character.currentHealth).toBe(10);
	});

	it('character heals more than max health', () => {
		const character = new Character();
		character.currentHealth = 5;
		character.heal(30);

		expect(character.currentHealth).toBe(10);
	});

	it('character health bar color is green', () => {
		const character = new Character();
		character.currentHealth = 8;

		expect(character.getHealthBarColor()).toBe('bg-green-500');
	});

	it('character health bar color is yellow', () => {
		const character = new Character();
		character.currentHealth = 6;

		expect(character.getHealthBarColor()).toBe('bg-yellow-500');
	});

	it('character health bar color is orange', () => {
		const character = new Character();
		character.currentHealth = 3;

		expect(character.getHealthBarColor()).toBe('bg-orange-500');
	});

	it('character health bar color is red', () => {
		const character = new Character();
		character.currentHealth = 1;

		expect(character.getHealthBarColor()).toBe('bg-red-500');
	});	
});
