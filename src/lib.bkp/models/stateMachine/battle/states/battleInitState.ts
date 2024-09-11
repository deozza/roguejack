import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { gameStore } from '$lib/stores/game';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import type { GameMachineState } from '../../game/gameMachineState';
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
		gameStore.createBattle();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
