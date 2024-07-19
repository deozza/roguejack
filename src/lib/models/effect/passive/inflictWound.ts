import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Bleeding from './bleeding';
import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import { gameStore } from '$lib/stores/game';
import DefaultEffect from './defaultEffect';
import { delay } from '$lib/utils';
import { EffectType } from '../types';

export default class InflictWound extends DefaultEffect {
	technicalName: string = 'inflictWound';
	name: string = 'Inflict wound';
	description: string = 'Inflicts bleeding when attacking';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:scar-wound';
	active: boolean = false;
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		const game: Game = get(gameStore);

		if (data['user'] === 'player') {
			if (game.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === false) {
				return;
			}

			this.updateStore(true, [playerSideEffectsStore]);
			enemySideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Bleeding());
				return sideEffects;
			});
		} else {
			if (game.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === false) {
				return;
			}
			this.updateStore(true, [enemySideEffectsStore]);
			playerSideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Bleeding());
				return sideEffects;
			});
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}
}
