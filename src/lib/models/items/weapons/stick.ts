import { Damage } from '$lib/models/damage/model';
import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '$lib/models/items/enums';
import type { WeaponInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class Stick implements WeaponInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'stick';
	name: string = 'Stick';
	description: string = 'Deal 1 damage to the enemy.';
	icon: string = 'game-icons:wood-stick';
	rarity: Rarities = Rarities.common;
	effects: EffectInterface[] = [];
	category: Categories = Categories.blunt;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;
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
		return new Stick();
	}
}
