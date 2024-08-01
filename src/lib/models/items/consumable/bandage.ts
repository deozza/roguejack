import { Categories, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import Bleeding from '$lib/models/effects/status/bleeding';
import Poisoned from '$lib/models/effects/status/poisoned';
import { Rarities } from '$lib/models/items/enums';
import type { ConsumableInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class Bandage implements ConsumableInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'bandage';
	name: string = 'Bandage';
	description: string = 'Heal from 1 bleeding.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.uncommon;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		if(calledBy === 'player') {
			gameStore.removeStatusFromPlayer(new Bleeding())
		}

		if(calledBy === 'enemy') {
			gameStore.removeStatusFromEnemy(new Bleeding())
		}
	}

	make(): ConsumableInterface {
		return new Bandage();
	}
}
