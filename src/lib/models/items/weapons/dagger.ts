import { Categories, Ranges, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { WeaponInterface } from "$lib/models/items/interfaces";
import { gameStore } from "$lib/stores/game";

export default class Dagger implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'dagger';
	name: string = 'Dagger';
	description: string = 'Deal 3 damage to the enemy.';
	icon: string = 'game-icons:plain-dagger';
	rarity: Rarities = Rarities.common;
	effects: EffectInterface[] = [];
	category: Categories = Categories.piercing;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;
	
	applyEffects(calledBy: 'player' | 'enemy'): void {
		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(3);
			return;
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(3);
			return;
		}	}

}
