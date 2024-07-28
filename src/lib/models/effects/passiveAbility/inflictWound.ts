import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../interfaces';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Bleeding from '../status/bleeding';

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
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (
				game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value >
				game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value
			) {
				playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
					return [...sideEffects, new Bleeding()];
				});
				
				gameStore.update((game: Game) => {
					game.player.status = [...game.player.status, new Bleeding()];
					return game;
				})
			}
			return;
		}

		if (
			game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value >
			game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value
		) {
			enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Bleeding()];
			});

			gameStore.update((game: Game) => {
				game.getCurrentBattle().enemy.status = [...game.getCurrentBattle().enemy.status, new Bleeding()];
				return game;
			})
		}

		return;
	}
}
