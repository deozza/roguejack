import { Damage } from '$lib/models/damage/model';
import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { WeaponInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class Spear implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'spear';
	name: string = 'Spear';
	description: string = 'Deal 1 damage to the enemy.';
	icon: string = 'game-icons:hatchet';
	rarity: Rarities = Rarities.common;
	effects: EffectInterface[] = [];
	category: Categories = Categories.piercing;
	type: Types = Types.physical;
	range: Ranges = Ranges.medium;
	defaultAmount = 1;
	currentAmount: number = 1;
	baseDamage: number = 1;

	applyEffects(calledBy: 'player' | 'enemy') {
		const damage: Damage = new Damage().setDamageByItem(this);

		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(damage);
			return;
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(damage);
			return;
		}
	}

	make(): WeaponInterface {
		return new Spear();
	}
}
