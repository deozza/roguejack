import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import { gameStore } from '$lib/stores/game';
import Sword from '../trigger/sword';
import { delay } from '$lib/utils';
import DefaultEffect from './defaultEffect';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { EffectType } from '../types';

export default class Bravery extends DefaultEffect {
	technicalName: string = 'bravery';
	name: string = 'Bravery';
	description: string = 'Generate a sword when facing a semiboss or a boss';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnIdleState';
	enableOnEnemyTurnState: string = 'TurnIdleState';
	icon: string = 'game-icons:sword-brandish';
	active: boolean = false;
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			if (game.battles.length % 5 === 0) {
				this.updateStore(true, [playerSideEffectsStore]);
				gameStore.addToInventory(new Sword(), 'player');
			}
		} else {
			this.updateStore(true, [enemySideEffectsStore]);
			gameStore.addToInventory(new Sword(), 'ennemy');
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}
}
