import { Battle } from '$lib/models/battle/model';
import { Character } from '$lib/models/character/model';
import type { Game } from '$lib/models/game/model';
import { type StateInterface } from '../../stateInterface';
import rat from '$lib/models/character/enemies/rat.json';
import { Turn } from '$lib/models/turn/model';
import { gameStore } from '$lib/stores/game';

export class GameInitState implements StateInterface {
	public onStateEnter = (): void => {
		console.log('Game Init State Entered');
	};

	public onStateExecute(data: object): void {
		const characterChosen: object = data['character'] as object;
		const game: Game = data['game'] as Game;

		const player = new Character();
		player.generateCharacter(characterChosen);
		game.player = player;

		gameStore.set(game);
	}

	public onStateExit = (): void => {
		console.log('Game Init State Exited');
	};
}
