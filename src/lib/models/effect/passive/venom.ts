import type EffectInterface from '../effectInterface';
import type { Rarities } from '../raritiesType';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Poisoned from './poisoned';
import { get } from 'svelte/store';
import { gameStore } from '$lib/stores/game';
import type { Game } from '$lib/models/game/model';

export default class Venom implements EffectInterface {
	technicalName: string = 'venom';
	name: string = 'Venom';
	description: string = 'Inflicts poison when attacking';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:fangs';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			if (game.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === false) {
				return;
			}

			enemySideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Poisoned());
				return sideEffects;
			});
		} else {
			if (game.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === false) {
				return;
			}

			playerSideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Poisoned());
				return sideEffects;
			});
		}
	}
}
