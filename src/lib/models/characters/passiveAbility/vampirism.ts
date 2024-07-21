import type { PassiveAbility } from "./interfaces";

export default class Vampirism implements PassiveAbility {
	technicalName: string = 'vampirism';
	name: string = 'Vampirism';
	description: string = 'Heal the amount of damages inflicted.';
	icon: string = 'game-icons:bleeding-wound';
	active: boolean = false;
}
