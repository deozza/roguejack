import { type StateInterface } from '../../stateInterface';

export class TurnWonState implements StateInterface {
	public name: string = 'TurnWonState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(): void {
		console.log(` ${this.name} executed`);
	}

	public onStateExit = (): void => {};
}
