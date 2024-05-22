export interface StateInterface {
    onStateEnter;
    onStateExecute(data: object): void
    onStateExit;
}