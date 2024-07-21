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
			NEW_GAME: GameCharacterSelectionState,
			PAUSE_GAME: GamePausedState
		},
		GameCharacterSelectionState: {
			CHARACTER_SELECTED: GameInitState,
			PAUSE_GAME: GamePausedState,
			QUIT_GAME: GameIdleState
		},
		GameInitState: {
			START_GAME: GamePlayingState,
			PAUSE_GAME: GamePausedState,
			QUIT_GAME: GameIdleState
		},
		GamePlayingState: {
			PAUSE_GAME: GamePausedState,
			END_GAME: GameLostState,
			QUIT_GAME: GameIdleState
		},
		GamePausedState: {
			RESUME_GAME: GamePlayingState
		},
		GameLostState: {
			QUIT_GAME: GameIdleState
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
