import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { gameStore } from '$lib/stores/game';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import type { GameMachineState } from '../../game/gameMachineState';
import type { Game } from '$lib/models/game/model';
import { enemySideEffectsStore } from '$lib/stores/sideEffects';
import type { Enemy } from '$lib/models/characters/enemies';

export default class BattleInitState extends DefaultState {
	public name: string = 'BattleInitState';

	public onStateEnter(): void {
		super.onStateEnter()
		const gameState: GameMachineState = get(gameMachineState)

		if(gameState.currentState.name !== 'GamePlayingState') {
			throw new Error('Cannot enter BattleInitState when game is not in GamePlayingState')
		}
	}

	public onStateExecute(): void {
		gameStore.createBattle();
		const game: Game = get(gameStore)
		const enemy: Enemy = game.getCurrentBattle()?.enemy as Enemy;
		if (enemy.passiveAbilities.length > 0) {
			enemySideEffectsStore.set(enemy.passiveAbilities);
		}
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}
