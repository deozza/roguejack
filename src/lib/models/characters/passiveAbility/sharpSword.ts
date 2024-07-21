import type { PassiveAbility } from "./interfaces";

export default class SharpSword  implements PassiveAbility {
	technicalName: string = 'sharpSword';
	name: string = 'Sharp sword';
	description: string = 'Deals 1 more damage if winning hand has a spade card';
	icon: string = 'game-icons:piercing-sword';
	active: boolean = false;
}
