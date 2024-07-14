import { Battle } from '$lib/models/battle/model';
import { Character } from '$lib/models/character/model';
import type { Game } from '$lib/models/game/model';
import { type StateInterface } from '../../stateInterface';
import rat from '$lib/models/character/enemies/rat.json';
import { gameStore } from '$lib/stores/game';

export class BattleInitState implements StateInterface {
	public name: string = 'BattleInitState';
	
	public onStateEnter = (): void => {
		console.log('Game Idle State Entered');
	};

	public onStateExecute(data: object): void {
		const game: Game = data['game'] as Game;

		const enemy: Character = new Character();
		enemy.generateCharacter(rat);

		const battle = new Battle(enemy, game.battles.length + 1);

		game.addBattle(battle);

		gameStore.set(game);
	}

	public onStateExit = (): void => {
		console.log('Game Idle State Exited');
	};
}
