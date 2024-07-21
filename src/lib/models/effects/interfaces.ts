import type { Targets } from "$lib/models/effects/enums";

export interface EffectInterface {

    applyEffect(target: Targets): void;
}