import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { battleMachineState } from '$lib/stores/stateMachine/battle';
import type { StateMachineInterface } from '$lib/models/stateMachine/stateMachineInterface';

export default class Bleeding implements EffectInterface {
	technicalName: string = 'bleeding';
	name: string = 'Bleeding';
	description: string = 'Inflicts 1 at the start of the turn. Ends at the end of the battle';
	enableOnBattleState: string = 'BattleInitState';
	enableOnPlayerTurnState: string = 'TurnInitState';
	enableOnEnemyTurnState: string = 'TurnInitState';
	icon: string = 'game-icons:blood';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const battleState: StateMachineInterface = get(battleMachineState);
		if (battleState.currentState.name === 'BattleInitState') {
			if (data['user'] === 'player') {
				playerSideEffectsStore.update((sideEffects) => {
					sideEffects = sideEffects.filter(
						(effect: EffectInterface) => effect.technicalName !== 'bleeding'
					);
					return sideEffects;
				});
			} else {
				enemySideEffectsStore.update((sideEffects) => {
					sideEffects = sideEffects.filter(
						(effect: EffectInterface) => effect.technicalName !== 'bleeding'
					);
					return sideEffects;
				});
			}
			return;
		}

		if (data['user'] === 'player') {
			gameStore.inflictDamagesToPlayer(1);
		} else {
			gameStore.inflictDamagesToEnemy(1);
		}
	}
}
