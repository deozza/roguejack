import { type EventInterface } from '../eventInterface';
import { type StateInterface } from '../stateInterface';
import { type StateMachineInterface } from '../stateMachineInterface';
import { BattlePlayingState } from './states';
import { BattleIdleState } from './states/battleIdleState';
import { BattleInitState } from './states/battleInitState';
import { BattleLostState } from './states/battleLostState';
import { BattleWonState } from './states/battleWonState';

export class BattleMachineState implements StateMachineInterface {
	public currentState: StateInterface = new BattleIdleState();

	public stateMachine: object = {
		BattleIdleState: {
			NEW_BATTLE: BattleInitState
		},
		BattleInitState: {
			PLAY: BattlePlayingState
		},
		BattlePlayingState: {
			WIN: BattleWonState,
			LOSE: BattleLostState
		},
		BattleWonState: {
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
			this.currentState.onStateExit();
			this.currentState = new nextState();
			this.currentState.onStateEnter();
		}
	}
}
