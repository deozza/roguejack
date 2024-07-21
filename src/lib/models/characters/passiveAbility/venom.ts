import type { PassiveAbility } from "$lib/models/characters/passiveAbility/interfaces";

export default class Venom implements PassiveAbility {
	technicalName: string = 'venom';
	name: string = 'Venom';
	description: string = 'Inflicts poison when attacking';
	icon: string = 'game-icons:fangs';
	active: boolean = false;
}
