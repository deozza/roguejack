import { Categories, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { ScrollInterface } from "$lib/models/items/interfaces";

export default class FireballScroll implements ScrollInterface {

	technicalName: string = 'fireballScroll';
	name: string = 'Fireball scroll';
	description: string = 'Deals 10 damages. You pass your turn and destroy 5 of your cards';
	icon: string = 'game-icons:fireball';
	category: Categories = Categories.fire;
	type: Types = Types.magical;
	range: Ranges = Ranges.far;
	rarity: Rarities = Rarities.epic;
	effects: EffectInterface[] = [];
	
	applyEffects(): void {
		throw new Error("Method not implemented.");
	}
}
