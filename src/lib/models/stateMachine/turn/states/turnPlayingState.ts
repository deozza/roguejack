import { type StateInterface } from '../../stateInterface';

export class TurnPlayingState implements StateInterface {
	public name: string = 'TurnPlayingState';

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
