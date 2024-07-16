import { type StateInterface } from '../../stateInterface';

export class TurnFightingState implements StateInterface {
	public name: string = 'TurnFightingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
