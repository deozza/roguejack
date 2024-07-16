import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class GameCharacterSelectionState implements StateInterface {
	public name: string = 'GameCharacterSelectionState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(data: object): void {
		const characterChosen: object = data['character'] as object;
		gameStore.setPlayer(characterChosen);
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
