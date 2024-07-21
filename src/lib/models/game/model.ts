import { Battle } from '$lib/models/battle/model';
import DefaultCharacter from '../characters';
import type { Player } from '../characters/interfaces';

export class Game {
	id: string;
	player: Player;
	battles: Array<Battle>;

	constructor() {
		this.id = crypto.randomUUID();
		this.player = new DefaultCharacter();
		this.battles = [];
	}

	public addBattle(battle: Battle): void {
		this.battles = [...this.battles, battle];
	}

	public getCurrentBattle(): Battle | null {
		if (this.battles.length === 0) {
			return null;
		}
		return this.battles[this.battles.length - 1];
	}
}
