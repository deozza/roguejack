import { Hand } from "$lib/models/hand/model";

export class Turn {
	id: string;
	turn: number;
	playerHand: Hand;
	enemyHand: Hand;

	constructor(turn: number) {
		this.id = crypto.randomUUID();
		this.turn = turn;
		this.playerHand = new Hand();
		this.enemyHand = new Hand();
	}
}
