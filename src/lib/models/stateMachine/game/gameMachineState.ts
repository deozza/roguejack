import type { EventInterface, StateInterface, StateMachineInterface } from '../interfaces';
import {
	GameCharacterSelectionState,
	GameIdleState,
	GameInitState,
	GameLostState,
	GamePausedState,
	GamePlayingState
} from './states';

export class GameMachineState implements StateMachineInterface {
	public currentState: StateInterface = new GameIdleState();

	public stateMachine: object = {
		GameIdleState: {
			NEW_GAME: new GameCharacterSelectionState(),
			PAUSE_GAME: new GamePausedState()
		},
		GameCharacterSelectionState: {
			CHARACTER_SELECTED: new GameInitState(),
			PAUSE_GAME: new GamePausedState(),
			QUIT_GAME: new GameIdleState()
		},
		GameInitState: {
			START_GAME: new GamePlayingState(),
			PAUSE_GAME: new GamePausedState(),
			QUIT_GAME: new GameIdleState()
		},
		GamePlayingState: {
			PAUSE_GAME: new GamePausedState(),
			END_GAME: new GameLostState(),
			QUIT_GAME: new GameIdleState()
		},
		GamePausedState: {
			RESUME_GAME: new GamePlayingState()
		},
		GameLostState: {
			QUIT_GAME: new GameIdleState()
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
