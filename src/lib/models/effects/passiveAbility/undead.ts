import type { ContinuousEffect } from "../interfaces";

export default class Undead implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'undead';
	name: string = 'Undead';
	description: string = 'Ignore damages if enemy hand does not contain club cards.';
	icon: string = 'game-icons:half-dead';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		console.log('undead effect entered');
	}
}
