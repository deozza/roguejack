import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../interfaces';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Bleeding from '../status/bleeding';
import { delay } from '$lib/utils';

export default class InflictWound implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'inflictWound';
	name: string = 'Inflict wound';
	description: string = 'Inflicts bleeding when attacking';
	icon: string = 'game-icons:scar-wound';
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
		this.active = true;
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (
				game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value >
				game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value
			) {
				playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
					return [...sideEffects, new Bleeding()];
				});

				delay(1000).then(() => {
					this.active = false;
				});
			}
			return;
		}

		if (
			game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value >
			game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value
		) {
			this.active = true;

			enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Bleeding()];
			});
			delay(1000).then(() => {
				this.active = false;
			});
		}

		return;
	}
}
