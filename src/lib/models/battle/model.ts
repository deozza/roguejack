import { Turn } from '$lib/models/turn/model';
import type { Enemy } from '../characters/interfaces';

export class Battle {
	id: string;
	enemy: Enemy;
	battle: number;
	turns: Array<Turn>;

	constructor(enemy: Enemy, battle: number) {
		this.id = crypto.randomUUID();
		this.enemy = enemy;
		this.turns = [];
		this.battle = battle;
	}

	public addTurn(turn: Turn): void {
		this.turns = [...this.turns, turn];
	}

	public getCurrentTurn(): Turn {
		return this.turns[this.turns.length - 1];
	}
}
