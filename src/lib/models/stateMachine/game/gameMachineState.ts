import { type EventInterface } from "../eventInterface";
import { type StateInterface } from "../stateInterface";
import { type StateMachineInterface } from "../stateMachineInterface";
import { GameCharacterSelectionState, GameIdleState, GameInitState, GameLostState, GamePausedState, GamePlayingState } from "./states";


export class GameMachineState implements StateMachineInterface{
    public currentState: StateInterface = new GameIdleState();

    public stateMachine: object = {
        GameIdleState: {
            'NEW_GAME': GameCharacterSelectionState
        },
        GameCharacterSelectionState: {
            'CHARACTER_SELECTED': GameInitState
        },
        GameInitState: {
            'START_GAME': GamePlayingState
        },
        GamePlayingState: {
            'PAUSE_GAME': GamePausedState,
            'END_GAME': GameLostState
        },
        GamePausedState: {
            'RESUME_GAME': GamePlayingState,
        },
        GameLostState: {
            'QUIT_GAME': GameIdleState
        }
    };

    public listenToEvent(event: EventInterface): void {
        const currentStateName = this.currentState.constructor.name;
        const nextState = this.stateMachine[currentStateName][event.name];
        if (nextState) {
            this.currentState.onStateExit();
            this.currentState = new nextState();
            this.currentState.onStateEnter();
        }
    }
}