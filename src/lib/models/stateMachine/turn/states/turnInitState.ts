import { gameStore } from '$lib/stores/game';
import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';
import { type StateInterface } from '../../stateInterface';
import { TurnPlayingState } from './turnPlayingState';

export class TurnInitState implements StateInterface {
	public name: string = 'TurnInitState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		gameStore.createTurn(data['user']);
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
