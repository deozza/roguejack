import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { WeaponInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class Crossbow implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'crossbow';
	name: string = 'Crossbow';
	description: string = 'Deal 2 damage to the enemy.';
	icon: string = 'game-icons:crossbow';
	rarity: Rarities = Rarities.epic;
	effects: EffectInterface[] = [];
	category: Categories = Categories.piercing;
	type: Types = Types.physical;
	range: Ranges = Ranges.far;
	defaultAmount = 5;
	currentAmount: number = 5;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(2);
			return;
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(2);
			return;
		}
	}

	make(): WeaponInterface {
		return new Crossbow();
	}
}
