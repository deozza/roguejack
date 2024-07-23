import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { get } from 'svelte/store';
import { DefaultState } from '../..';

export default class TurnLostState extends DefaultState {
	public name: string = 'TurnLostState';

	public onStateEnter(): void {
		super.onStateEnter()
		super.onStateExit()
		const playerSideEffects = get(playerSideEffectsStore);
        const enemySideEffects = get(enemySideEffectsStore);

		playerSideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('player').forEach((effect) => {
				if(effect.state === 'onStateEnter_'+this.name) {
					effect.callback();
				}
            });
		});

        enemySideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('enemy').forEach((effect) => {
                if(effect.state === 'onStateEnter_'+this.name) {
					effect.callback();
				}
            });
		});
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}