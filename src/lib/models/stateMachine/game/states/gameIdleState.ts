import { type StateInterface } from '../../stateInterface';

export class GameIdleState implements StateInterface {
	public name: string = 'GameIdleState';
	
	public onStateEnter = (): void => {
		console.log('Game Idle State Entered');
	};

	public onStateExecute(): void {
		console.log('Game Idle State Executed');
	}

	public onStateExit = (): void => {
		console.log('Game Idle State Exited');
	};
}
