import type { ContinuousEffect } from "../interfaces";

export default class InflictWound implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'inflictWound';
	name: string = 'Inflict wound';
	description: string = 'Inflicts bleeding when attacking';
	icon: string = 'game-icons:scar-wound';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		console.log('inflictWounds effect entered');
	}
}
