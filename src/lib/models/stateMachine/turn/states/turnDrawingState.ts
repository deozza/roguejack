import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class TurnDrawingState implements StateInterface {
	public name: string = 'TurnDrawingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		if(data['user'] === 'player') {
			gameStore.playerDrawCard();
			return;
		}

		console.log('in draw state');

		if(data['user'] === 'enemy') {
			console.log('enemy drawing');

			gameStore.enemyAutoDraw();
		}
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
