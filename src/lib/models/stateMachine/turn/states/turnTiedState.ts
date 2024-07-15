import { type StateInterface } from '../../stateInterface';

export class TurnTiedState implements StateInterface {
	public name: string = 'TurnTiedState';
	
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
