import type { CharacterInterface } from '$lib/models/characters';
import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameInitState extends DefaultState implements StateInterface {
	public name: string = 'GameInitState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(data: object): void {
		if (data.character === undefined || data.character === null) {
			throw new Error('CharacterInterface not selected');
		}

		const player: CharacterInterface = data.character as CharacterInterface;

		gameStore.setPlayer(player);
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
