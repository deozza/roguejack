import { describe, expect, it } from 'vitest';
import { Game } from './model';
import { Battle } from '../battle/model';
import { Character } from '../character/model';

describe('game model test', () => {
	it('add battle to game', () => {
		const game: Game = new Game();
		expect(game.battles.length).toBe(0);

		const enemy: Character = new Character();
		const battle: Battle = new Battle(enemy, game.battles.length);
		game.addBattle(battle);

		expect(game.battles.length).toBe(1);
	});

	it('get current battle', () => {
		const game: Game = new Game();
		expect(game.getCurrentBattle()).toBe(null);

		const enemy: Character = new Character();
		const battle: Battle = new Battle(enemy, game.battles.length);
		game.addBattle(battle);

		expect(game.getCurrentBattle()).toEqual(battle);
	});
});
