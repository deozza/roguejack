import { Categories, Ranges, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { WeaponInterface } from "$lib/models/items/interfaces";
import { gameStore } from "$lib/stores/game";

export default class TwoHandedAxe implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'twoHandedAxe';
	name: string = 'Two handed axe';
	description: string = 'Deal 3 damage to the enemy.';
	icon: string = 'game-icons:sharp-axe';
	rarity: Rarities = Rarities.uncommon;
	effects: EffectInterface[] = [];
	category: Categories = Categories.slashing;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;
	defaultAmount =  1;
	currentAmount: number = 1;
	
	applyEffects(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(3);
			return;
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(3);
			return;
		}
	}

}
