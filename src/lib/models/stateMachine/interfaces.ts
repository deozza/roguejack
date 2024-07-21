export interface StateMachineInterface {
	currentState: StateInterface;
	stateMachine: object;
	listenToEvent(event: EventInterface): void;
}


export interface StateInterface {
	name: string;
	onStateEnter(): void;
	onStateExecute(data: object): void;
	onStateExit(): void;
}

export interface EventInterface {
	name: string;
	data: any;
}
