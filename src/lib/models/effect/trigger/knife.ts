import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class Knife implements EffectInterface {
	technicalName: string = 'knife';
	name: string = 'Knife';
	description: string = 'Deal 1 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:bowie-knife';
	rarity: Rarities = 'common';

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(1);
				return game;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(1);
				return game;
			});
		}
	}
}