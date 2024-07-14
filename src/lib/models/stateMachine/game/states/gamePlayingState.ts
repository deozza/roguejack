import { type StateInterface } from '../../stateInterface';

export class GamePlayingState implements StateInterface {
	public onStateEnter = (): void => {
		console.log('Game Playing State Entered');
	};

	public onStateExecute(): void {
		console.log('Game Playing State Executed');
	}

	public onStateExit = (): void => {
		console.log('Game Playing State Exited');
	};
}
