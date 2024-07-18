import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import Sword from '../trigger/sword';
import type { Rarities } from '../raritiesType';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Poisoned from './poisoned';

export default class Venom implements EffectInterface {
	technicalName: string = 'venom';
	name: string = 'Venom';
	description: string = 'Inflicts poison when attacking';
	enableOnBattleState: string = 'BattleInitState';
	enableOnPlayerTurnState: string = 'TurnWonState';
	enableOnEnemyTurnState: string = 'TurnWonState';
	icon: string = 'game-icons:fangs';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			enemySideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Poisoned());
				return sideEffects;
			});
		} else {
			playerSideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Poisoned());
				return sideEffects;
			});
		}
	}
}
