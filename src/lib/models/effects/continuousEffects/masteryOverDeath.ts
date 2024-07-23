import type { ContinuousEffect } from "../interfaces";

export default class MasteryOverDeath implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'masteryOverDeath';
	name: string = 'Mastery Over Death';
	description: string = 'Deal 1 more base power for every 10 cards in the discard.';
	icon: string = 'game-icons:graveyard';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		console.log('masteryOverDeath effect entered');
	}
}
