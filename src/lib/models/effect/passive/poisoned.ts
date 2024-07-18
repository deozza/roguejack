import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { battleMachineState } from '$lib/stores/stateMachine/battle';
import type { StateMachineInterface } from '$lib/models/stateMachine/stateMachineInterface';

export default class Poisoned implements EffectInterface {
	technicalName: string = 'poisoned';
	name: string = 'Poisoned';
	description: string = 'Inflicts 1 damage when drawing a card. Ends at the end of the battle';
	enableOnBattleState: string = 'BattleInitState';
	enableOnPlayerTurnState: string = 'TurnDrawingState';
	enableOnEnemyTurnState: string = 'TurnDrawingState';
	icon: string = 'game-icons:poison-bottle';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const battleState: StateMachineInterface = get(battleMachineState);
		if (battleState.currentState.name === 'BattleInitState') {
			playerSideEffectsStore.update((sideEffects) => {
				sideEffects = sideEffects.filter(
					(effect: EffectInterface) => effect.technicalName !== 'poisoned'
				);
				return sideEffects;
			});
			return;
		}

		if (data['user'] === 'player') {
			gameStore.inflictDamagesToPlayer(1);
		} else {
			gameStore.inflictDamagesToEnemy(1);
		}
	}
}
