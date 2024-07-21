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
			NEW_BATTLE: BattleInitState
		},
		BattleInitState: {
			PLAY: BattlePlayingState,
			DECK_EMPTY: BattleLostState
		},
		BattlePlayingState: {
			WIN: BattleWonState,
			LOSE: BattleLostState
		},
		BattleWonState: {
			CAMP: BattleCampingState
		},
		BattleCampingState: {
			NEW_BATTLE: BattleInitState,
			SHOP: BattleShopingState
		},
		BattleShopingState: {
			RESET: BattleIdleState
		},
		BattleLostState: {
			RESET: BattleIdleState
		}
	};

	public listenToEvent(event: EventInterface): void {
		const currentStateName = this.currentState.name;
		const nextState: StateInterface | undefined = this.stateMachine[currentStateName][event.name];
		if (nextState) {
			this.currentState.onStateExit();
			this.currentState = nextState;
			this.currentState.onStateEnter();
			this.currentState.onStateExecute(event.data);
		}
	}
}
