import { Hand } from '$lib/models/hand/model';
import { Fight } from '$lib/models/fight/model';

export class Turn {
	id: string;
	turn: number;
	playerHand: Hand;
	enemyHand: Hand;
	fight: Fight;

	constructor(turn: number) {
		this.id = crypto.randomUUID();
		this.turn = turn;
		this.playerHand = new Hand();
		this.enemyHand = new Hand();
		this.fight = new Fight();
	}
}
