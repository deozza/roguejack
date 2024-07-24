import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { WeaponInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class Hatchet implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'hatchet';
	name: string = 'Hatchet';
	description: string = 'Deal 1 damage to the enemy.';
	icon: string = 'game-icons:hatchet';
	rarity: Rarities = Rarities.common;
	effects: EffectInterface[] = [];
	category: Categories = Categories.slashing;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(1);
			return;
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(1);
			return;
		}
	}
}
