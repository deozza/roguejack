import { describe, it, expect } from 'vitest';
import { Character } from './model';

describe('character model test', () => {
	it('character takes normal damage amount', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.currentHealth).toBe(10);

		character.takeDamage(5);
		expect(character.currentHealth).toBe(5);
	});

	it('character takes more damage than health', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.currentHealth).toBe(10);

		character.takeDamage(15);
		expect(character.currentHealth).toBe(0);
	});

	it('character heals normal amount', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.currentHealth).toBe(10);

		character.takeDamage(10);
		expect(character.currentHealth).toBe(0);

		character.heal(5);
		expect(character.currentHealth).toBe(5);
	});

	it('character heals more than max health', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.currentHealth).toBe(10);

		character.takeDamage(10);
		expect(character.currentHealth).toBe(0);

		character.heal(15);
		expect(character.currentHealth).toBe(10);
	});

	it('character health bar color is green', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.getHealthColor()).toBe('bg-green-500');
	});

	it('character health bar color is yellow', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.getHealthColor()).toBe('bg-green-500');

		character.takeDamage(3);
		expect(character.getHealthColor()).toBe('bg-yellow-500');
	});

	it('character health bar color is orange', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.getHealthColor()).toBe('bg-green-500');

		character.takeDamage(5);
		expect(character.getHealthColor()).toBe('bg-orange-500');
	});

	it('character health bar color is red', () => {
		const character = new Character();
		character.generateCharacter();
		expect(character.getHealthColor()).toBe('bg-green-500');

		character.takeDamage(10);
		expect(character.getHealthColor()).toBe('bg-red-500');
	});
});
