import { get } from "svelte/store";
import type { StateInterface } from "./interfaces";
import { playerSideEffectsStore } from "$lib/stores/sideEffects";

export class DefaultState implements StateInterface {
    name: string = 'DefaultState';

    constructor() {
    }

    onStateEnter(): void {
        const passiveEffects = get(playerSideEffectsStore);

		passiveEffects.forEach((sideEffect) => {
			
		});
    }

    onStateExecute(): void {
    }

    onStateExit(): void {
        const passiveEffects = get(playerSideEffectsStore);

		passiveEffects.forEach((sideEffect) => {
			
		});
    }
}