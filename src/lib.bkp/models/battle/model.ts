import { Turn } from '$lib/models/turn/model';
import type { Enemy } from '$lib/models/characters/enemies';

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

	public addTurn(turn: Turn): Battle {
		this.turns = [...this.turns, turn];
		return this;
	}

	public getCurrentTurn(): Turn | null {
		if (this.turns.length === 0) {
			return null;
		}
		return this.turns[this.turns.length - 1];
	}
}
