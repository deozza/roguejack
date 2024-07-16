import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from './raritiesType';

export default class Sword implements EffectInterface {
	name: string = 'Sword';
	description: string = 'Deal 5 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:broadsword';
	rarities: Rarities = 'rare';

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(5);
				return game;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(5);
				return game;
			});
		}
	}
}
