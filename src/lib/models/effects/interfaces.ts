import type { Targets } from "./enums";

export interface EffectInterface {

    applyEffect(target: Targets): void;
}