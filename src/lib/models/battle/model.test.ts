import { describe, it, expect } from 'vitest';
import { Battle } from './model';
import Rat from '../characters/enemies/standard/rat';
import type { Enemy } from '../characters/enemies';
import { Turn } from '../turn/model';
import Slime from '../characters/enemies/standard/slime';

describe('battle model test', () => {
	it('add turn', () => {

		const enemy: Enemy = new Slime();
		const battle: Battle = new Battle(enemy, 1);

		expect(battle.turns.length).toBe(0);

		const turn: Turn = new Turn(1);
		battle.addTurn(turn);

		expect(battle.turns.length).toBe(1);
	});

	it('get current turn', () => {
		const enemy: Enemy = new Slime();
		const battle: Battle = new Battle(enemy, 1);

		expect(battle.getCurrentTurn()).toBeNull();

		const turn: Turn = new Turn(1);
		battle.addTurn(turn);

		expect(battle.getCurrentTurn()).toEqual(turn);
	});

});
