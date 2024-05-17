import { describe, it, expect, beforeEach } from 'vitest';
import { characterStore } from './index';

describe('characterStore test', () => {

	beforeEach(() => {
		characterStore.generateCharacter();
	});

	it('characterStore takes normal damage amount', () => {
		expect(characterStore.getCharacter().currentHealth).toBe(10);

		characterStore.takeDamage(5);
		expect(characterStore.getCharacter().currentHealth).toBe(5);
	});

	it('characterStore takes more damage than health', () => {
		expect(characterStore.getCharacter().currentHealth).toBe(10);

		characterStore.takeDamage(15);
		expect(characterStore.getCharacter().currentHealth).toBe(0);
	});

	it('characterStore heals normal amount', () => {
		expect(characterStore.getCharacter().currentHealth).toBe(10);

		characterStore.takeDamage(10);
		expect(characterStore.getCharacter().currentHealth).toBe(0);

		characterStore.heal(5);
		expect(characterStore.getCharacter().currentHealth).toBe(5);
	});

	it('characterStore heals more than max health', () => {
		expect(characterStore.getCharacter().currentHealth).toBe(10);

		characterStore.takeDamage(10);
		expect(characterStore.getCharacter().currentHealth).toBe(0);

		characterStore.heal(15);
		expect(characterStore.getCharacter().currentHealth).toBe(10);
	});

	it('characterStore health bar color is green', () => {
		expect(characterStore.getHealthColor()).toBe('bg-green-500');
	});

	it('characterStore health bar color is yellow', () => {
		expect(characterStore.getHealthColor()).toBe('bg-green-500');

		characterStore.takeDamage(3);
		expect(characterStore.getHealthColor()).toBe('bg-yellow-500');
	});

	it('characterStore health bar color is orange', () => {
		expect(characterStore.getHealthColor()).toBe('bg-green-500');

		characterStore.takeDamage(5);
		expect(characterStore.getHealthColor()).toBe('bg-orange-500');
	});

	it('characterStore health bar color is red', () => {
		expect(characterStore.getHealthColor()).toBe('bg-green-500');

		characterStore.takeDamage(10);
		expect(characterStore.getHealthColor()).toBe('bg-red-500');
	});
});
