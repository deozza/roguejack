import { gameStore } from '$lib/stores/game';
import { playerTurnMachineState } from '$lib/stores/stateMachine/turn';
import { type StateInterface } from '../../stateInterface';
import { TurnPlayingState } from '../../turn/states/turnPlayingState';

export class BattlePlayingState implements StateInterface {
	public name: string = 'BattlePlayingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(): void {}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
