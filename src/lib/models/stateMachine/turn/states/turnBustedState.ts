import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class TurnBustedState implements StateInterface {
	public name: string = 'TurnBustedState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		if(data['user'] === 'player') {
			gameStore.inflictDamagesToBustedPlayer();
			return;
		}

		if(data['user'] === 'enemy') {
			gameStore.inflictDamagesToBustedEnemy();
			return;
		}
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
