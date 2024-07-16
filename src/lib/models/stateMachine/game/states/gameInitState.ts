import { battleMachineState } from '$lib/stores/stateMachine/battle';
import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';
import { BattleMachineState } from '../../battle/battleMachineState';
import { type StateInterface } from '../../stateInterface';
import { TurnMachineState } from '../../turn/turnMachineState';

export class GameInitState implements StateInterface {
	public name: string = 'GameInitState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		battleMachineState.set(new BattleMachineState());
		playerTurnMachineState.set(new TurnMachineState());
		enemyTurnMachineState.set(new TurnMachineState());
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
