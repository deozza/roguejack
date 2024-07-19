import { get } from 'svelte/store';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { battleMachineState } from '$lib/stores/stateMachine/battle';
import type { StateMachineInterface } from '$lib/models/stateMachine/stateMachineInterface';
import DefaultEffect from './defaultEffect';
import { delay } from '$lib/utils';
import type { PassiveEffectInterface } from '../interfaces';
import { EffectType } from '../types';

export default class Bleeding extends DefaultEffect {
	technicalName: string = 'bleeding';
	name: string = 'Bleeding';
	description: string = 'Inflicts 1 at the start of the turn. Ends at the end of the battle';
	enableOnBattleState: string = 'BattleInitState';
	enableOnPlayerTurnState: string = 'TurnInitState';
	enableOnEnemyTurnState: string = 'TurnInitState';
	icon: string = 'game-icons:blood';
	active: boolean = false;
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		const battleState: StateMachineInterface = get(battleMachineState);
		if (battleState.currentState.name === 'BattleInitState') {
			playerSideEffectsStore.update((sideEffects) => {
				sideEffects = sideEffects.filter(
					(effect: PassiveEffectInterface) => effect.technicalName !== 'bleeding'
				);
				return sideEffects;
			});
			return;
		}

		if (data['user'] === 'player') {
			this.updateStore(true, [playerSideEffectsStore]);
			gameStore.inflictDamagesToPlayer(1);
		} else {
			this.updateStore(true, [enemySideEffectsStore]);
			gameStore.inflictDamagesToEnemy(1);
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}
}
