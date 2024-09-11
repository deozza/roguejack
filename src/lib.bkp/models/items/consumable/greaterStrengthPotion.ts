import { Categories, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { ConsumableInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class GreaterStrengthPotion implements ConsumableInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'greaterStrengthPotion';
	name: string = 'Greater strength potion';
	description: string = 'Gets 25% more health points.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.rare;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		gameStore.addHealthPercentages(25, calledBy);
	}

	make(): ConsumableInterface {
		return new GreaterStrengthPotion();
	}
}
