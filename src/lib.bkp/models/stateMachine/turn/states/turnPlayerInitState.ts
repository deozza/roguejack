import { get } from 'svelte/store';
import { DefaultState } from '../..';
import type { GameMachineState } from '../../game/gameMachineState';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import type { BattleMachineState } from '../../battle/battleMachineState';
import { battleMachineState } from '$lib/stores/stateMachine/battle';
import { gameStore } from '$lib/stores/game';
import type { StateInterface } from '../../interfaces';

export default class TurnPlayerInitState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerInitState';

	public onStateEnter(): void {
		const gameState: GameMachineState = get(gameMachineState);

		if (gameState.currentState.name !== 'GamePlayingState') {
			throw new Error('Cannot enter TurnPlayerInitState when game is not in GamePlayingState');
		}

		const battleState: BattleMachineState = get(battleMachineState);
		if (battleState.currentState.name !== 'BattlePlayingState') {
			throw new Error('Cannot enter TurnPlayerInitState when battle is not in BattlePlayingState');
		}

		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {
		gameStore.createTurn();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
