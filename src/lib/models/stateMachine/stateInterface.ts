export interface StateInterface {
	name: string;
	onStateEnter;
	onStateExecute(data: object): void;
	onStateExit;
}
