import type { ContinuousEffect } from "../interfaces";

export default class Vampirism implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'vampirism';
	name: string = 'Vampirism';
	description: string = 'Heal the amount of damages inflicted.';
	icon: string = 'game-icons:bleeding-wound';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		console.log('vampirism effect entered');
	}
}
