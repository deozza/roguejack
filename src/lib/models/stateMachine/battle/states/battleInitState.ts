import { type StateInterface } from '../../stateInterface';
import { gameStore } from '$lib/stores/game';
import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';

export class BattleInitState implements StateInterface {
	public name: string = 'BattleInitState';

	public onStateEnter = (data: object): void => {};

	public onStateExecute(data: object): void {
		gameStore.createBattle();
		enemySideEffectsStore.set([]);
		const game: Game = get(gameStore);

		if (game.getCurrentBattle()?.enemy.sideEffect !== null) {
			enemySideEffectsStore.update((enemySideEffectsStore) => [
				...enemySideEffectsStore,
				game.getCurrentBattle()?.enemy.sideEffect
			]);
		}
	}

	public onStateExit = (data: object): void => {
		const stateToEnable: string = 'enableOnBattleState';
		const playerPassiveEffects = get(playerSideEffectsStore);
		const enemyPassiveEffects = get(enemySideEffectsStore);

		playerPassiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});

		enemyPassiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};
}
