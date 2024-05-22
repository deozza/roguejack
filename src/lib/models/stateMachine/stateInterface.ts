export interface StateInterface {
    onStateEnter;
    onStateExecute(): void
    onStateExit;
}