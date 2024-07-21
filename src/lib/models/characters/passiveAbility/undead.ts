import type { PassiveAbility } from "$lib/models/characters/passiveAbility/interfaces";

export default class Undead implements PassiveAbility {
	technicalName: string = 'undead';
	name: string = 'Undead';
	description: string = 'Ignore damages if enemy hand does not contain club cards.';
	icon: string = 'game-icons:half-dead';
	active: boolean = false;
}
