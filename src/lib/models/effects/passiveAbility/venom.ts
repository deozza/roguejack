import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../interfaces';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Poisoned from '../status/poisoned';

export default class Venom implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'venom';
	name: string = 'Venom';
	description: string = 'Inflicts poison when attacking';
	icon: string = 'game-icons:fangs';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnLostState',
				callback: () => this.onStateEnter_TurnLostState(calledBy)
			}
		];
	}

	public onStateEnter_TurnLostState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (
				game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value >
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
			game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value >
			game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value
		) {

			enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Poisoned()];
			});

			gameStore.addStatusToEnemy(new Poisoned());
		}

		return;
	}
}
