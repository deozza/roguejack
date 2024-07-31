import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { gameStore } from '$lib/stores/game';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import type { GameMachineState } from '../../game/gameMachineState';
import type { Game } from '$lib/models/game/model';
import { enemySideEffectsStore } from '$lib/stores/sideEffects';
import type { EnemyInterface } from '$lib/models/characters/enemies';
import type { StateInterface } from '../../interfaces';

export default class BattleInitState extends DefaultState implements StateInterface {
	public name: string = 'BattleInitState';

	public onStateEnter(): void {
		const gameState: GameMachineState = get(gameMachineState);

		if (gameState.currentState.name !== 'GamePlayingState') {
			throw new Error('Cannot enter BattleInitState when game is not in GamePlayingState');
		}

		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {
		enemySideEffectsStore.set([]);

		gameStore.createBattle();
		const game: Game = get(gameStore);
		const enemy: EnemyInterface = game.getCurrentBattle()?.enemy as EnemyInterface;
		if (enemy.passiveAbilities.length > 0) {
			enemySideEffectsStore.set(enemy.passiveAbilities);
		}
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
