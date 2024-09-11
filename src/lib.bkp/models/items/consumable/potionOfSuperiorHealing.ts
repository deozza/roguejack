import { Categories, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { ConsumableInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class PotionOfSuperiorfHealing implements ConsumableInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'potionOfSuperiorHealing';
	name: string = 'Potion of superior healing';
	description: string = 'Restore 50% of your health.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.rare;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		gameStore.healPercentages(50, calledBy);
	}

	make(): ConsumableInterface {
		return new PotionOfSuperiorfHealing();
	}
}
