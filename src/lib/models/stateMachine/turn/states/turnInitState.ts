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

		if(data['user'] !== 'player') {
			enemyTurnMachineState.update((state) => {
				state.currentState = new TurnPlayingState();
				return state;
			})
			return;
		}

		gameStore.createTurn();

		playerTurnMachineState.update((state) => {
			state.currentState = new TurnPlayingState();
			return state;
		})
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
