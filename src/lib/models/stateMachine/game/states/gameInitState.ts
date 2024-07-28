import type { Character } from '$lib/models/characters';
import Bleeding from '$lib/models/effects/status/bleeding';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameInitState extends DefaultState implements StateInterface {
	public name: string = 'GameInitState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(data: object): void {
		if (data.character === undefined || data.character === null) {
			throw new Error('Character not selected');
		}

		const player: Character = data.character as Character;

		playerSideEffectsStore.set([]);
		enemySideEffectsStore.set([]);
		gameStore.setPlayer(player);
		if (player.passiveAbilities.length > 0) {
			playerSideEffectsStore.set(player.passiveAbilities);
		}

	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
