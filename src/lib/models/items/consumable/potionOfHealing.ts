import { Categories, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '../enums';
import type { ConsumableInterface } from '../interfaces';

export default class PotionOfHealing implements ConsumableInterface {
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'potionOfHealing';
	name: string = 'Potion of healing';
	description: string = 'Restore 10% of your health.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.common;

	applyEffects(): void {
		throw new Error("Method not implemented.");
	}

}
