import { gameStore } from '$lib/stores/game';
import { playerSideEffectsStore } from '$lib/stores/sideEffects';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';

export class TurnInitState implements StateInterface {
	public name: string = 'TurnInitState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		gameStore.createTurn(data['user']);
	}

	public onStateExit = (data: object): void => {
		const passiveEffects = get(playerSideEffectsStore);
		const stateToEnable: string =
			data['user'] === 'player' ? 'enableOnPlayerTurnState' : 'enableOnEnemyTurnState';
		passiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});	
	};
}
