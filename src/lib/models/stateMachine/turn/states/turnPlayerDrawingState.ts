import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';

export default class TurnPlayerDrawingState extends DefaultState {
	public name: string = 'TurnPlayerDrawingState';

	public onStateEnter(): void {
		super.onStateEnter()

		const playerSideEffects = get(playerSideEffectsStore);
        const enemySideEffects = get(enemySideEffectsStore);

		playerSideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('player').forEach((effect) => {
				if(effect.state === 'onStateEnter_TurnPlayerDrawingState') {
					effect.callback();
				}
            });
		});

        enemySideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('enemy').forEach((effect) => {
                if(effect.state === 'onStateEnter_TurnPlayerDrawingState') {
					effect.callback();
				}
            });
		});
	}

	public onStateExecute(): void {
		gameStore.playerDrawCard();
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}