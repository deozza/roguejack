import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';
import type { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
import { TurnLostState } from '$lib/models/stateMachine/turn/states/turnLostState';
import type { DamageTriggerEffectInterface } from '../interfaces';
import { DamageType, EffectRange, EffectType } from '../types';

export default class EarthquakeScroll implements DamageTriggerEffectInterface {
	technicalName: string = 'earthquakeScroll';
	name: string = 'Earthquake scroll';
	description: string = "Deals 10 damages. Your ennemy can't play.";
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:earth-spit';
	rarity: Rarities = 'legendary';
	damageType: DamageType = DamageType.earth;
	effectRange: EffectRange = EffectRange.far;
	effectType: EffectType = EffectType.magical;

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(10);
				return game;
			});

			enemyTurnMachineState.update((state: TurnMachineState) => {
				state.currentState = new TurnLostState();
				return state;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(10);
				return game;
			});
			playerTurnMachineState.update((state: TurnMachineState) => {
				state.currentState = new TurnLostState();
				return state;
			});
		}
	}
}
