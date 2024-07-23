import { get } from 'svelte/store';
import { DefaultState } from '../..';
import type { GameMachineState } from '../../game/gameMachineState';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import type { BattleMachineState } from '../../battle/battleMachineState';
import { battleMachineState } from '$lib/stores/stateMachine/battle';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';

export default class TurnPlayerInitState extends DefaultState {
	public name: string = 'TurnPlayerInitState';

	public onStateEnter(): void {
		super.onStateEnter()
		const gameState: GameMachineState = get(gameMachineState)

		if(gameState.currentState.name !== 'GamePlayingState') {
			throw new Error('Cannot enter TurnPlayerInitState when game is not in GamePlayingState')
		}

		const battleState: BattleMachineState = get(battleMachineState)
		if(battleState.currentState.name !== 'BattlePlayingState') {
			throw new Error('Cannot enter TurnPlayerInitState when battle is not in BattlePlayingState')
		}
	}

	public onStateExecute(): void {
		gameStore.createTurn();
	}

	public onStateExit(): void {
		super.onStateExit()
		const playerSideEffects = get(playerSideEffectsStore);
        const enemySideEffects = get(enemySideEffectsStore);

		playerSideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('player').forEach((effect) => {
				if(effect.state === 'onStateExit_TurnPlayerInit') {
					effect.callback();
				}
            });
		});

        enemySideEffects.forEach((sideEffect : ContinuousEffect | Status) => {
			sideEffect.applyEffects('enemy').forEach((effect) => {
                if(effect.state === 'onStateExit_TurnPlayerInit') {
					effect.callback();
				}
            });
		});
	}
}

