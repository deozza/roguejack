import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Bleeding from './bleeding';

export default class InflictWound implements EffectInterface {
	technicalName: string = 'inflictWound';
	name: string = 'Inflict wound';
	description: string = 'Inflicts bleeding when attacking';
	enableOnBattleState: string = 'BattleInitState';
	enableOnPlayerTurnState: string = 'TurnWonState';
	enableOnEnemyTurnState: string = 'TurnWonState';
	icon: string = 'game-icons:scar-wound';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			enemySideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Bleeding());
				return sideEffects;
			});
		} else {
			playerSideEffectsStore.update((sideEffects) => {
				sideEffects.push(new Bleeding());
				return sideEffects;
			});
		}
	}
}
