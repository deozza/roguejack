import { Battle } from '$lib/models/battle/model';
import { Character } from '$lib/models/character/model';

export class Game {
	id: string;
	player: Character;
	battles: Array<Battle>;

	constructor() {
		this.id = crypto.randomUUID();
		this.player = new Character();
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
