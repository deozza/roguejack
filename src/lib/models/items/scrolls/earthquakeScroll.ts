import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { ContinuousEffect, EffectInterface, Status } from '$lib/models/effects/interfaces';
import Paralyzed from '$lib/models/effects/status/paralyzed';
import type { Game } from '$lib/models/game/model';
import { Rarities } from '$lib/models/items/enums';
import type { ScrollInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
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
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		const game: Game = get(gameStore);
		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(10);
			for (let i = 0; i < 5; i++) {
				game.player.deck.drawTopCard;
			}
			enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Paralyzed()];
			});
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(10);
			for (let i = 0; i < 5; i++) {
				game.getCurrentBattle()?.enemy.deck.drawTopCard;
			}

			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Paralyzed()];
			});

			gameStore.update((game: Game) => {
				game.player.status = [...game.player.status, new Paralyzed()];
				return game;
			})
		}
	}

	make(): ScrollInterface {
		return new EarthquakeScroll();
	}
}
