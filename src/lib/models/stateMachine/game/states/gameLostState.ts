import { type StateInterface } from '../../stateInterface';

export class GameLostState implements StateInterface {
	public onStateEnter = (): void => {
		console.log('Game Lost State Entered');
	};

	public onStateExecute(): void {
		console.log('Game Lost State Executed');
	}

	public onStateExit = (): void => {
		console.log('Game Lost State Exited');
	};
}
