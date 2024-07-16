import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';
import { playerSideEffectsStore } from '$lib/stores/sideEffects';

export class TurnDamageState implements StateInterface {
	public name: string = 'TurnDamageState';

	public onStateEnter = (data: object): void => {
		const sideEffects = get(playerSideEffectsStore);
		const stateToEnable: string =
			data['user'] === 'player' ? 'enableOnPlayerTurnState' : 'enableOnEnemyTurnState';
		sideEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};

	public onStateExecute(data: object): void {
		gameStore.updateFightData();
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
