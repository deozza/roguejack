import type { EventInterface, StateInterface, StateMachineInterface } from '../interfaces';
import {
	BattleCampingState,
	BattleIdleState,
	BattleInitState,
	BattleLostState,
	BattlePlayingState,
	BattleShopingState,
	BattleWonState
} from './states';

export class BattleMachineState implements StateMachineInterface {
	public currentState: StateInterface = new BattleIdleState();

	public stateMachine: object = {
		BattleIdleState: {
			NEW_BATTLE: new BattleInitState()
		},
		BattleInitState: {
			PLAY: new BattlePlayingState(),
			DECK_EMPTY: new BattleLostState()
		},
		BattlePlayingState: {
			WIN: new BattleWonState(),
			LOSE: new BattleLostState()
		},
		BattleWonState: {
			CAMP: new BattleCampingState()
		},
		BattleCampingState: {
			RESET: new BattleIdleState(),
			SHOP: new BattleShopingState()
		},
		BattleShopingState: {
			RESET: new BattleIdleState()
		},
		BattleLostState: {
			RESET: new BattleIdleState()
		}
	};

	public listenToEvent(event: EventInterface): BattleMachineState {
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
