import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';

export class BattlePlayingState implements StateInterface {
	public name: string = 'BattlePlayingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(): void {}

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
