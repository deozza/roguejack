import { enemySideEffectsStore, playerSideEffectsStore } from "$lib/stores/sideEffects";
import { get } from "svelte/store";
import type { ContinuousEffect, Status } from "../effects/interfaces";

export class DefaultState{

    onStateEnter(currentStateName: string): void {
        const playerSideEffects = get(playerSideEffectsStore);
        const enemySideEffects = get(enemySideEffectsStore);

		playerSideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('player').forEach((effect) => {
				if(effect.state === 'onStateEnter_'+currentStateName) {
					effect.callback();
				}
            });
		});

        enemySideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('enemy').forEach((effect) => {
                if(effect.state === 'onStateEnter_'+currentStateName) {
					effect.callback();
				}
            });
		});
    }

    onStateExit(currentStateName: string): void {
        const playerSideEffects = get(playerSideEffectsStore);
        const enemySideEffects = get(enemySideEffectsStore);

		playerSideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('player').forEach((effect) => {
				if(effect.state === 'onStateExit_'+currentStateName) {
					effect.callback();
				}
            });
		});

        enemySideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('enemy').forEach((effect) => {
                if(effect.state === 'onStateExit'+currentStateName) {
					effect.callback();
				}
            });
		});
    }
}