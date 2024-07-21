import type { EventInterface, StateInterface, StateMachineInterface } from '../interfaces';
import { TurnDamageState, TurnEnemyBustedState, TurnEnemyDeckEmptyState, TurnEnemyDrawingState, TurnEnemyInitState, TurnEnemyPlayingState, TurnEnemyUsingItemState, TurnFightingState, TurnIdleState, TurnLostState, TurnPlayerBustedState, TurnPlayerDeckEmptyState, TurnPlayerDrawingState, TurnPlayerPlayingState, TurnPlayerUsingItemState, TurnTiedState, TurnWonState } from './states';
import TurnPlayerInitState from './states/turnPlayerInitState';


export class TurnMachineState implements StateMachineInterface {
	public currentState: StateInterface = new TurnIdleState();

	public stateMachine: object = {
		TurnIdleState: {
			NEW_TURN: TurnPlayerInitState
		},
		TurnPlayerInitState: {
			PLAY: TurnPlayerPlayingState,
			DECK_EMPTY: TurnPlayerDeckEmptyState
		},
		TurnPlayerPlayingState: {
			DRAW: TurnPlayerDrawingState,
			USE_ITEM: TurnPlayerUsingItemState,
			FIGHT: TurnEnemyInitState
		},
		TurnPlayerDrawingState: {
			PLAY: TurnPlayerPlayingState,
			BUST: TurnPlayerBustedState,
			DECK_EMPTY: TurnPlayerDeckEmptyState,
			FIGHT: TurnEnemyInitState
		},
		TurnPlayerUsingItemState: {
			PLAY: TurnPlayerPlayingState
		},
		TurnEnemyInitState: {
			PLAY: TurnEnemyPlayingState,
		},
		TurnEnemyPlayingState: {
			DRAW: TurnEnemyDrawingState,
			USE_ITEM: TurnEnemyUsingItemState,
			FIGHT: TurnFightingState,
		},
		TurnEnemyDrawingState: {
			PLAY: TurnEnemyPlayingState,
			BUST: TurnEnemyBustedState,
			DECK_EMPTY: TurnEnemyDeckEmptyState
		},
		TurnFightingState: {
			DAMAGE: TurnDamageState
		},
		TurnDamageState: {
			WIN: TurnWonState,
			TIE: TurnTiedState,
			LOSE: TurnLostState
		},
		TurnEnemyDeckEmptyState: {
			RESET: TurnIdleState
		},
		TurnPlayerDeckEmptyState: {
			RESET: TurnIdleState
		},
		TurnEnemyBustedState: {
			RESET: TurnIdleState
		},
		TurnPlayerBustedState: {
			RESET: TurnIdleState
		},
		TurnWonState: {
			RESET: TurnIdleState
		},
		TurnTiedState: {
			RESET: TurnIdleState
		},
		TurnLostState: {
			RESET: TurnIdleState
		}
	};

	public listenToEvent(event: EventInterface): StateInterface {
		const currentStateName = this.currentState.name;
		const nextState: StateInterface | undefined = this.stateMachine[currentStateName][event.name];
		if (nextState) {
			this.currentState.onStateExit(event.data);
			this.currentState = nextState;
		}

		return this.currentState;
	}
}
