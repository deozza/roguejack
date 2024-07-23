import { Categories, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { ConsumableInterface } from "$lib/models/items/interfaces";
import { gameStore } from "$lib/stores/game";

export default class PotionOfHealing implements ConsumableInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'potionOfHealing';
	name: string = 'Potion of healing';
	description: string = 'Restore 10% of your health.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.common;
	defaultAmount =  1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		gameStore.healPercentages(10, calledBy);
	}

}
