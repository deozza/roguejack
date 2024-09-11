import { Damage } from '$lib/models/damage/model';
import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import Paralyzed from '$lib/models/effects/status/paralyzed';
import type { Game } from '$lib/models/game/model';
import { Rarities } from '$lib/models/items/enums';
import type { ScrollInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';

export default class EarthquakeScroll implements ScrollInterface {
	id: string = crypto.randomUUID();

	technicalName: string = 'earthquakeScroll';
	name: string = 'Earthquake scroll';
	description: string = 'Deals 10 damages. Your ennemy is paralyzed.';
	icon: string = 'game-icons:earth-spit';
	category: Categories = Categories.earth;
	type: Types = Types.magical;
	range: Ranges = Ranges.far;
	rarity: Rarities = Rarities.legendary;
	effects: EffectInterface[] = [];
	baseDamage: number = 10;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		const game: Game = get(gameStore);
		const damage: Damage = new Damage().setDamageByItem(this);

		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(damage);
			for (let i = 0; i < 5; i++) {
				game.player.deck.drawTopCard;
			}

			gameStore.addStatusToEnemy(new Paralyzed());
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(damage);
			for (let i = 0; i < 5; i++) {
				game.getCurrentBattle()?.enemy.deck.drawTopCard;
			}

			gameStore.addStatusToPlayer(new Paralyzed());
		}
	}

	make(): ScrollInterface {
		return new EarthquakeScroll();
	}
}
