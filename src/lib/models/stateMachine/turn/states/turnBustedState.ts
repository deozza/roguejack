import { type StateInterface } from '../../stateInterface';

export class TurnBustedState implements StateInterface {
	public name: string = 'TurnBustedState';

	public onStateEnter = (): void => {
		console.log('Turn Idle State Entered');
	};

	public onStateExecute(): void {
		console.log('Turn Idle State Executed');
	}

	public onStateExit = (): void => {
		console.log('Turn Idle State Exited');
	};
}
