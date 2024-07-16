import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from './raritiesType';

export default class Knife implements EffectInterface {
	name: string = 'Knife';
	description: string = 'Deal 1 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:bowie-knife';
	rarities: Rarities = 'common';

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
