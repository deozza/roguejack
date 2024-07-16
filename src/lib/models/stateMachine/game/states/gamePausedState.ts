import { type StateInterface } from '../../stateInterface';

export class GamePausedState implements StateInterface {
	public name: string = 'GamePausedState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(): void {
		console.log(` ${this.name} executed`);
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
