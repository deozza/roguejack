import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { gameStore } from '$lib/stores/game';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import type { GameMachineState } from '../../game/gameMachineState';

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
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}
