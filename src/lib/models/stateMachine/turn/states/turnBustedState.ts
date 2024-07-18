import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';

export class TurnBustedState implements StateInterface {
	public name: string = 'TurnBustedState';

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
