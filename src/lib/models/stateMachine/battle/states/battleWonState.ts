import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';

export default class BattleWonState extends DefaultState {
	public name: string = 'BattleWonState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()


		const playerSideEffects = get(playerSideEffectsStore);
        const enemySideEffects = get(enemySideEffectsStore);

		playerSideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('player').forEach((effect) => {
				if(effect.state === 'onStateExit_BattleWonState') {
					effect.callback();
				}
            });
		});

        enemySideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('enemy').forEach((effect) => {
                if(effect.state === 'onStateExit_BattleWonState') {
					effect.callback();
				}
            });
		});
	}
}
