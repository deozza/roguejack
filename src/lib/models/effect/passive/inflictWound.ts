import type EffectInterface from '../effectInterface';
import type { Rarities } from '../raritiesType';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Bleeding from './bleeding';
import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import { gameStore } from '$lib/stores/game';

export default class InflictWound implements EffectInterface {
	technicalName: string = 'inflictWound';
	name: string = 'Inflict wound';
	description: string = 'Inflicts bleeding when attacking';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:scar-wound';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const game: Game = get(gameStore);

		if (data['user'] === 'player') {
			if (game.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === false) {
				return;
			}
			enemySideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Bleeding());
				return sideEffects;
			});
		} else {
			if (game.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === false) {
				return;
			}
			playerSideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Bleeding());
				return sideEffects;
			});
		}
	}
}
