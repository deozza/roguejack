import type { ContinuousEffect } from "../interfaces";

export default class SharpSword  implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'sharpSword';
	name: string = 'Sharp sword';
	description: string = 'Deals 1 more damage if winning hand has a spade card';
	icon: string = 'game-icons:piercing-sword';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		console.log('sharpSword effect entered');
	}
}
