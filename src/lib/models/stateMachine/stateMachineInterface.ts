import type { EventInterface } from "./eventInterface";
import type { StateInterface } from "./stateInterface";

export interface StateMachineInterface {
    currentState: StateInterface;
    stateMachine: object;
    listenToEvent(event: EventInterface): void;
}