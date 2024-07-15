import { type StateInterface } from '../../stateInterface';

export class GameIdleState implements StateInterface {
	public name: string = 'GameIdleState';
	
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
