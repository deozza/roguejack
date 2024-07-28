import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../interfaces';
import {
	enemySideEffectsStore,
	enemyUsingItemStore,
	playerSideEffectsStore,
	playerUsingItemStore
} from '$lib/stores/sideEffects';
import Poisoned from '../status/poisoned';
import type { ItemTypes } from '$lib/models/items/types';

export default class Spore implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'spore';
	name: string = 'Spore';
	description: string = 'Inflicts poison when attacked';
	icon: string = 'game-icons:spotted-mushroom';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnWonState',
				callback: () => this.onStateEnter_TurnLostState(calledBy)
			},
			{
				state: 'onStateExit_TurnPlayerUsingItemState',
				callback: () => this.onStateExit_TurnPlayerUsingItemState(calledBy)
			},
			{
				state: 'onStateExit_TurnEnemyUsingItemState',
				callback: () => this.onStateExit_TurnEnemyUsingItemState(calledBy)
			}
		];
	}

	public onStateEnter_TurnLostState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (
				game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value <
				game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value
			) {
				playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
					return [...sideEffects, new Poisoned()];
				});


				gameStore.addStatusToPlayer(new Poisoned());
			}
			return;
		}

		if (
			game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value <
			game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value
		) {
			enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Poisoned()];
			});
			
			gameStore.addStatusToEnemy(new Poisoned());
		}

		return;
	}

	public onStateExit_TurnPlayerUsingItemState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			const item: ItemTypes | null = get(playerUsingItemStore);
			if (item === null) {
				return;
			}

			if (item.range === undefined || item.range === null) {
				return;
			}

			if (item.range === Ranges.far) {
				return;
			}

			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Poisoned()];
			});

			gameStore.addStatusToPlayer(new Poisoned());

			return;
		}
	}

	public onStateExit_TurnEnemyUsingItemState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			const item: ItemTypes | null = get(enemyUsingItemStore);
			if (item === null) {
				return;
			}

			if (item.range === undefined || item.range === null) {
				return;
			}

			if (item.range === Ranges.far) {
				return;
			}

			enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Poisoned()];
			});

			gameStore.addStatusToEnemy(new Poisoned());

			return;
		}
	}
}
