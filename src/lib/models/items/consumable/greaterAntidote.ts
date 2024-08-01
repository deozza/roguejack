import { Categories, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import Poisoned from '$lib/models/effects/status/poisoned';
import { Rarities } from '$lib/models/items/enums';
import type { ConsumableInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class GreaterAntidote implements ConsumableInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'greaterAntidote';
	name: string = 'Greater antidote';
	description: string = 'Heal all poison.';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = Rarities.rare;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		if (calledBy === 'player') {
			gameStore.removeStatusFromPlayer(new Poisoned(), true);
		}

		if (calledBy === 'enemy') {
			gameStore.removeStatusFromEnemy(new Poisoned(), true);
		}
	}

	make(): ConsumableInterface {
		return new GreaterAntidote();
	}
}
