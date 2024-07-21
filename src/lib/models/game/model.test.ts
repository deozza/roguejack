import { describe, it, expect } from 'vitest';
import { Game } from './model';
import { Battle } from '../battle/model';
import Slime from '../characters/enemies/standard/slime';
import type { Enemy } from '../characters/enemies';

describe('game model test', () => {
	it('add battle', () => {

		const game: Game = new Game();
		expect(game.battles.length).toBe(0);

		const enemy: Enemy = new Slime();
		const battle: Battle = new Battle(enemy, 1);
		game.addBattle(battle);

		expect(game.battles.length).toBe(1);
	});

	it('get current battle', () => {
		const game: Game = new Game();
		expect(game.getCurrentBattle()).toBeNull();

		const enemy: Enemy = new Slime();
		const battle: Battle = new Battle(enemy, 1);
		game.addBattle(battle);

		expect(game.getCurrentBattle()).toEqual(battle);
	});
});
