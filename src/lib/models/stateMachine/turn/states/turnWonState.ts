import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';

export class TurnWonState implements StateInterface {
	public name: string = 'TurnWonState';

	public onStateEnter = (data: object): void => {

		let sideEffects = null;
		let stateToEnable = null;

		if(data['user'] === 'player') {
			sideEffects = get(playerSideEffectsStore);
			stateToEnable = 'enableOnPlayerTurnState';
		}else{
			sideEffects = get(enemySideEffectsStore);
			stateToEnable = 'enableOnEnemyTurnState';
		}

		sideEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
		
	};

	public onStateExecute(): void {
		console.log(` ${this.name} executed`);
	}

	public onStateExit = (): void => {};
}
