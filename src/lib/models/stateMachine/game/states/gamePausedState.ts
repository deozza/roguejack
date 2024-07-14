import { type StateInterface } from '../../stateInterface';

export class GamePausedState implements StateInterface {
	public name: string = 'GamePausedState';
	
	public onStateEnter = (): void => {
		console.log('Game Pause State Entered');
	};

	public onStateExecute(): void {
		console.log('Game Pause State Executed');
	}

	public onStateExit = (): void => {
		console.log('Game Pause State Exited');
	};
}
