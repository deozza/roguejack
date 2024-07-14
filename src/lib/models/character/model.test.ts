import { describe, it, expect } from 'vitest';
import { Character } from './model';

import soldier from './players/soldier.json';

describe('character model test', () => {
	it('character takes normal damage amount', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.currentHealth).toBe(20);

		character.takeDamage(5);
		expect(character.currentHealth).toBe(15);
	});

	it('character takes more damage than health', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.currentHealth).toBe(20);

		character.takeDamage(25);
		expect(character.currentHealth).toBe(0);
	});

	it('character heals normal amount', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.currentHealth).toBe(20);

		character.takeDamage(10);
		expect(character.currentHealth).toBe(10);

		character.heal(5);
		expect(character.currentHealth).toBe(15);
	});

	it('character heals more than max health', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.currentHealth).toBe(20);

		character.takeDamage(10);
		expect(character.currentHealth).toBe(10);

		character.heal(15);
		expect(character.currentHealth).toBe(20);
	});

	it('character health bar color is green', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.getHealthColor()).toBe('bg-green-500');
	});

	it('character health bar color is yellow', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.getHealthColor()).toBe('bg-green-500');

		character.takeDamage(5);
		expect(character.getHealthColor()).toBe('bg-yellow-500');
	});

	it('character health bar color is orange', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.getHealthColor()).toBe('bg-green-500');

		character.takeDamage(10);
		expect(character.getHealthColor()).toBe('bg-orange-500');
	});

	it('character health bar color is red', () => {
		const character = new Character();
		character.generateCharacter(soldier);
		expect(character.getHealthColor()).toBe('bg-green-500');

		character.takeDamage(15);
		expect(character.getHealthColor()).toBe('bg-red-500');
	});
});
