import { type StateInterface } from '../../stateInterface';
import { gameStore } from '$lib/stores/game';

export class BattleInitState implements StateInterface {
	public name: string = 'BattleInitState';
	
	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		gameStore.createBattle();
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
