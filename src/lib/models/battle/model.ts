import { Character } from '$lib/models/character/model';
import { Turn } from '$lib/models/turn/model';

export class Battle {
	id: string;
	enemy: Character;
	battle: number;
	turns: Array<Turn>;

	constructor(enemy: Character, battle: number) {
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
