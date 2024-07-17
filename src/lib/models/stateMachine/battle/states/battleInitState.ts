import { type StateInterface } from '../../stateInterface';
import { gameStore } from '$lib/stores/game';
import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';

export class BattleInitState implements StateInterface {
	public name: string = 'BattleInitState';

	public onStateEnter = (data: object): void => {
		const passiveEffects = get(playerSideEffectsStore);
		const stateToEnable: string = 'enableOnBattleState';

		passiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};

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

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
