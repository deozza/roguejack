import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class TurnDrawingState implements StateInterface {
	public name: string = 'TurnDrawingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public async onStateExecute(data: object): Promise<void> {
		if (data['user'] === 'player') {
			gameStore.playerDrawCard();
			return;
		}

		if (data['user'] === 'enemy') {
			await gameStore.enemyAutoDraw();
		}
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
