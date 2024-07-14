import { type StateInterface } from '../../stateInterface';

export class BattleLostState implements StateInterface {
	public name: string = 'BattleLostState';
	
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
