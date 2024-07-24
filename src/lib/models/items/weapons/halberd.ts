import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { WeaponInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class Halberd implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'halberd';
	name: string = 'Halberd';
	description: string = 'Deal 5 damage to the enemy.';
	icon: string = 'game-icons:sharp-halberd';
	rarity: Rarities = Rarities.rare;
	effects: EffectInterface[] = [];
	category: Categories = Categories.slashing;
	type: Types = Types.physical;
	range: Ranges = Ranges.medium;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(5);
			return;
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(5);
			return;
		}
	}
}