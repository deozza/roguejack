import { type StateInterface } from '../../stateInterface';

export class GameCharacterSelectionState implements StateInterface {
	public onStateEnter = (): void => {
		console.log('Game Selection State Entered');
	};

	public onStateExecute(): void {
		console.log('Game Selection State Executed');
	}

	public onStateExit = (): void => {
		console.log('Game Selection State Exited');
	};
}
