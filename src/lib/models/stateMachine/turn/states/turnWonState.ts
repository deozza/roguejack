import { type StateInterface } from '../../stateInterface';

export class TurnWonState implements StateInterface {
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
