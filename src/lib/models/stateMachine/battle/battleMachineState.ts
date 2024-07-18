import { type EventInterface } from '../eventInterface';
import { type StateInterface } from '../stateInterface';
import { type StateMachineInterface } from '../stateMachineInterface';
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
			NEW_BATTLE: BattleInitState
		},
		BattleLostState: {
			RESET: BattleIdleState
		}
	};

	public listenToEvent(event: EventInterface): void {
		const currentStateName = this.currentState.name;
		const nextState = this.stateMachine[currentStateName][event.name];
		if (nextState) {
			this.currentState.onStateExit(event.data);
			this.currentState = new nextState();
		}
	}
}
