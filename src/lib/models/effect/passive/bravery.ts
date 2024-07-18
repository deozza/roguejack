import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import Sword from '../trigger/sword';
import type { Rarities } from '../raritiesType';

export default class Bravery implements EffectInterface {
	technicalName: string = 'bravery';
	name: string = 'Bravery';
	description: string = 'Generate a sword when facing a semiboss or a boss';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnIdleState';
	enableOnEnemyTurnState: string = 'TurnIdleState';
	icon: string = 'game-icons:sword-brandish';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			if ((game.battles.length) % 5 === 0) {
				gameStore.addToInventory(new Sword(), 'player');
			}
		} else {
			gameStore.addToInventory(new Sword(), 'ennemy');
		}
	}
}
