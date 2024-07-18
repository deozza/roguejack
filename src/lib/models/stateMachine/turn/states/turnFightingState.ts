import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';

export class TurnFightingState implements StateInterface {
	public name: string = 'TurnFightingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {}

	public onStateExit = (data: object): void => {
		let passiveEffects = null;
		let stateToEnable = null;

		if (data['user'] === 'player') {
			passiveEffects = get(playerSideEffectsStore);
			stateToEnable = 'enableOnPlayerTurnState';
		} else {
			passiveEffects = get(enemySideEffectsStore);
			stateToEnable = 'enableOnEnemyTurnState';
		}

		passiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};
}
