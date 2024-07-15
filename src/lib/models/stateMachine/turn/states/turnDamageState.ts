import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class TurnDamageState implements StateInterface {
	public name: string = 'TurnDamageState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		gameStore.updateFightData()
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
