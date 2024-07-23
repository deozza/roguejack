import type { StateInterface } from "./interfaces";

export class DefaultState implements StateInterface {
    name: string = 'DefaultState';

    constructor() {
    }

    onStateEnter(): void {

    }

    onStateExecute(data: object): void {
    }

    onStateExit(): void {

    }
}