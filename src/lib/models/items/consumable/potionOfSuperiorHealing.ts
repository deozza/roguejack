import { Categories, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { ConsumableInterface } from "$lib/models/items/interfaces";

export default class PotionOfSuperiorfHealing implements ConsumableInterface {
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'potionOfSuperiorHealing';
	name: string = 'Potion of superior healing';
	description: string = 'Restore 50% of your health.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.common;

	applyEffects(): void {
		throw new Error("Method not implemented.");
	}

}
