import { type EventInterface } from "../eventInterface";
import { type StateInterface } from "../stateInterface";
import { type StateMachineInterface } from "../stateMachineInterface";
import { TurnBustedState } from "./states/turnBustedState";
import { TurnDeckEmptyState } from "./states/turnDeckEmptyState";
import { TurnDrawingState } from "./states/turnDrawingState";
import { TurnFightingState } from "./states/turnFightingState";
import { TurnIdleState } from "./states/turnIdleState";
import { TurnInitState } from "./states/turnInitState";
import { TurnLostState } from "./states/turnLostState";
import { TurnPlayingState } from "./states/turnPlayingState";
import { TurnWonState } from "./states/turnWonState";


export class TurnMachineState implements StateMachineInterface{
    public currentState: StateInterface = new TurnIdleState();

    public stateMachine: object = {
        TurnIdleState: {
            'NEW_TURN': TurnInitState
        },
        TurnInitState: {
            'PLAY': TurnPlayingState
        },
        TurnPlayingState: {
            'DRAW': TurnDrawingState,
            'FIGHT': TurnFightingState
        },
        TurnDrawingState: {
            'PLAY': TurnPlayingState,
            'BUST': TurnBustedState,
            'DECK_EMPTY': TurnDeckEmptyState
        },
        TurnFightingState: {
            'WIN': TurnWonState,
            'DRAW': TurnDrawingState,
            'LOSE': TurnLostState
        },
        TurnWinState: {
            'NEW_TURN': TurnInitState
        },
        TurnDrawState: {
            'NEW_TURN': TurnInitState
        },
        TurnBustState: {
            'NEW_TURN': TurnInitState
        },

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