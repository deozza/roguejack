import type { EventInterface, StateInterface, StateMachineInterface } from '../interfaces';
import {
	TurnDamageState,
	TurnEnemyBustedState,
	TurnEnemyDeckEmptyState,
	TurnEnemyDrawingState,
	TurnEnemyInitState,
	TurnEnemyPlayingState,
	TurnEnemyUsingItemState,
	TurnFightingState,
	TurnIdleState,
	TurnLostState,
	TurnPlayerBustedState,
	TurnPlayerDeckEmptyState,
	TurnPlayerDrawingState,
	TurnPlayerPlayingState,
	TurnPlayerUsingItemState,
	TurnTiedState,
	TurnWonState
} from './states';
import TurnPlayerInitState from './states/turnPlayerInitState';

export class TurnMachineState implements StateMachineInterface {
	public currentState: StateInterface = new TurnIdleState();

	public stateMachine: object = {
		TurnIdleState: {
			NEW_TURN: new TurnPlayerInitState()
		},
		TurnPlayerInitState: {
			PLAY: new TurnPlayerPlayingState(),
			DECK_EMPTY: new TurnPlayerDeckEmptyState()
		},
		TurnPlayerPlayingState: {
			DRAW: new TurnPlayerDrawingState(),
			USE_ITEM: new TurnPlayerUsingItemState(),
			FIGHT: new TurnEnemyInitState()
		},
		TurnPlayerDrawingState: {
			PLAY: new TurnPlayerPlayingState(),
			BUST: new TurnPlayerBustedState(),
			DECK_EMPTY: new TurnPlayerDeckEmptyState()
		},
		TurnPlayerUsingItemState: {
			PLAY: new TurnPlayerPlayingState()
		},
		TurnEnemyInitState: {
			PLAY: new TurnEnemyPlayingState()
		},
		TurnEnemyPlayingState: {
			DRAW: new TurnEnemyDrawingState(),
			USE_ITEM: new TurnEnemyUsingItemState(),
			FIGHT: new TurnFightingState()
		},
		TurnEnemyDrawingState: {
			PLAY: new TurnEnemyPlayingState(),
			BUST: new TurnEnemyBustedState(),
			DECK_EMPTY: new TurnEnemyDeckEmptyState()
		},
		TurnEnemyUsingItemState: {
			PLAY: new TurnEnemyPlayingState()
		},
		TurnFightingState: {
			DAMAGE: new TurnDamageState()
		},
		TurnEnemyBustedState: {
			DAMAGE: new TurnDamageState()
		},
		TurnPlayerBustedState: {
			DAMAGE: new TurnDamageState()
		},
		TurnDamageState: {
			WIN: new TurnWonState(),
			TIE: new TurnTiedState(),
			LOSE: new TurnLostState()
		},
		TurnEnemyDeckEmptyState: {
			RESET: new TurnIdleState()
		},
		TurnPlayerDeckEmptyState: {
			RESET: new TurnIdleState()
		},
		TurnWonState: {
			RESET: new TurnIdleState()
		},
		TurnTiedState: {
			RESET: new TurnIdleState()
		},
		TurnLostState: {
			RESET: new TurnIdleState()
		}
	};

	public listenToEvent(event: EventInterface): TurnMachineState {
		const currentStateName = this.currentState.name;
		const nextState: StateInterface | undefined = this.stateMachine[currentStateName][event.name];
		if (nextState) {
			this.currentState.onStateExit();
			this.currentState = nextState;
			this.currentState.onStateEnter();
			this.currentState.onStateExecute(event.data);
		}

		return this;
	}
}
