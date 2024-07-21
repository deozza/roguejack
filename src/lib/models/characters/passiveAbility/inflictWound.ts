import type { PassiveAbility } from "$lib/models/characters/passiveAbility/interfaces";

export default class InflictWound implements PassiveAbility {
	technicalName: string = 'inflictWound';
	name: string = 'Inflict wound';
	description: string = 'Inflicts bleeding when attacking';
	icon: string = 'game-icons:scar-wound';
	active: boolean = false;
}
