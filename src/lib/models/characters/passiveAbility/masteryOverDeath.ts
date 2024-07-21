import type { PassiveAbility } from "$lib/models/characters/passiveAbility/interfaces";

export default class MasteryOverDeath implements PassiveAbility {
	technicalName: string = 'masteryOverDeath';
	name: string = 'Mastery Over Death';
	description: string = 'Deal 1 more base power for every 10 cards in the discard.';
	icon: string = 'game-icons:graveyard';
	active: boolean = false;
}
