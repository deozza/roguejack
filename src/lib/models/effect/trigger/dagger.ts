import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class Dagger implements EffectInterface {
	technicalName: string = 'dagger';
	name: string = 'Dagger';
	description: string = 'Deal 3 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:plain-dagger';
	rarity: Rarities = 'uncommon';

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(3);
				return game;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(3);
				return game;
			});
		}
	}
}
