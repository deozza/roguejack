import { Battle } from '../battle/model';
import { Character } from '../character/model';

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
