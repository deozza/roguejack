import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class TurnBustedState implements StateInterface {
	public name: string = 'TurnBustedState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {}

	public onStateExit = (): void => {};
}
