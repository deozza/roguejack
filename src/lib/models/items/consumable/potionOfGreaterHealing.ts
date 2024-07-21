import { Categories, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "../enums";
import type { ConsumableInterface } from "../interfaces";


export default class PotionOfGreaterHealing implements ConsumableInterface {
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'potionOfGreaterHealing';
	name: string = 'Potion of greater healing';
	description: string = 'Restore 25% of your health.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.uncommon;

	applyEffects(): void {
		throw new Error("Method not implemented.");
	}

}
