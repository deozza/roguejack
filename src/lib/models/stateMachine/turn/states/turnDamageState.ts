import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';

export class TurnDamageState implements StateInterface {
	public name: string = 'TurnDamageState';

	public onStateEnter = (data: object): void => {
		const playerPassiveEffects = get(playerSideEffectsStore);
		const playerStateToEnable: string =
			data['user'] === 'player' ? 'enableOnPlayerTurnState' : 'enableOnEnemyTurnState';
		playerPassiveEffects.forEach((sideEffect) => {
			if (sideEffect[playerStateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});

		const enemyPassiveEffects = get(enemySideEffectsStore);
		const enemyStateToEnable: string =
			data['user'] === 'player' ? 'enableOnPlayerTurnState' : 'enableOnEnemyTurnState';
		enemyPassiveEffects.forEach((sideEffect) => {
			if (sideEffect[enemyStateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};

	public onStateExecute(data: object): void {
		gameStore.updateFightData();
	}

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
