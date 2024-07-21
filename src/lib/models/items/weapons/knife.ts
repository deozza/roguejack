import { Categories, Ranges, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { WeaponInterface } from "$lib/models/items/interfaces";

export default class Knife implements WeaponInterface {
	technicalName: string = 'knife';
	name: string = 'Knife';
	description: string = 'Deal 1 damage to the enemy.';
	icon: string = 'game-icons:bowie-knife';
	rarity: Rarities = Rarities.uncommon;
	effects: EffectInterface[] = [];
	category: Categories = Categories.piercing;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;
	
	applyEffects(): void {
		throw new Error("Method not implemented.");
	}
}
