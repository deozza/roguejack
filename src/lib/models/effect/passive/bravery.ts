import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import Sword from '../trigger/sword';

export default class Bravery implements EffectInterface {
	name: string = 'Bravery';
	description: string = 'Generate a sword when facing a semiboss or a boss';
	enableOnBattleState: string = 'BattleInitState';
	enableOnPlayerTurnState: string = 'TurnIdleState';
	enableOnEnemyTurnState: string = 'TurnIdleState';
	icon: string = 'game-icons:sword-brandish';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			if ((game.battles.length + 1) % 5 === 0) {
				gameStore.addToInventory('sword', 'player');
			}
		} else {
			gameStore.addToInventory('sword', 'ennemy');
		}
	}
}
