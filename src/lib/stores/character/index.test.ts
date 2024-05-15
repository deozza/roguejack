import { describe, it, expect, beforeEach } from 'vitest';
import { createCharacterStore, getHealthColor } from './index';
import { derived, get } from 'svelte/store';

describe('character test', () => {

	beforeEach(() => {
	});

	it('character takes normal damage amount', () => {
		const character = createCharacterStore();
		expect(get(character).currentHealth).toBe(10);

		character.takeDamage(5);

		expect(get(character).currentHealth).toBe(5);
	});

	it('character takes more damage than health', () => {
		const character = createCharacterStore();
		expect(get(character).currentHealth).toBe(10);

		character.takeDamage(15);

		expect(get(character).currentHealth).toBe(0);
	});

	it('character heals normal amount', () => {
		const character = createCharacterStore();
		expect(get(character).currentHealth).toBe(10);

		character.takeDamage(10);
		expect(get(character).currentHealth).toBe(0);

		character.heal(5);
		expect(get(character).currentHealth).toBe(5);
	});

	it('character heals more than max health', () => {
		const character = createCharacterStore();
		expect(get(character).currentHealth).toBe(10);

		character.takeDamage(10);
		expect(get(character).currentHealth).toBe(0);

		character.heal(15);
		expect(get(character).currentHealth).toBe(10);
	});

	it('character health bar color is green', () => {
		const character = createCharacterStore();
		const healthColor = derived(character, $character => getHealthColor($character));

		expect(get(healthColor)).toBe('bg-green-500');
	});

	it('character health bar color is yellow', () => {
		const character = createCharacterStore();
		const healthColor = derived(character, $character => getHealthColor($character));

		expect(get(healthColor)).toBe('bg-green-500');

		character.takeDamage(3);
		expect(get(healthColor)).toBe('bg-yellow-500');
	});

	it('character health bar color is orange', () => {
		const character = createCharacterStore();
		const healthColor = derived(character, $character => getHealthColor($character));

		expect(get(healthColor)).toBe('bg-green-500');

		character.takeDamage(5);
		expect(get(healthColor)).toBe('bg-orange-500');
	});

	it('character health bar color is red', () => {
		const character = createCharacterStore();
		const healthColor = derived(character, $character => getHealthColor($character));

		expect(get(healthColor)).toBe('bg-green-500');

		character.takeDamage(10);
		expect(get(healthColor)).toBe('bg-red-500');
	});	
});
