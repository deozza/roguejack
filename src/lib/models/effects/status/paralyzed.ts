import { enemySideEffectsStore, playerSideEffectsStore } from "$lib/stores/sideEffects";
import { turnMachineState } from "$lib/stores/stateMachine/turn";
import { delay } from "$lib/utils";
import type { ContinuousEffect, Status } from "../interfaces";

export default class Paralyzed implements Status {
    technicalName: string = 'paralyzed';
	name: string = 'Paralyzed';
	description: string = 'Skip this turn';
	icon: string = 'game-icons:cancel';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{state: 'onStateEnter_TurnPlayerPlayingState', callback: () => this.skipTurn()},
			{state: 'onStateEnter_TurnEnemyPlayingState', callback: () => this.skipTurn()},
			{state: 'onStateExit_TurnFightingState', callback: () => this.onStateExit_TurnFightingState(calledBy)},
		]
	}

	public skipTurn() {
		this.active = true;

		turnMachineState.update((state) => {
			state = state.listenToEvent({ name: 'DAMAGE', data: null })

			return state;
		});

		delay(1000).then(() => {
			this.active = false;
		});
	}

	public onStateExit_TurnFightingState(calledBy: 'player' | 'enemy') {
		if(calledBy === 'player'){
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
			});

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
		});
	}

}