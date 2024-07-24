import type { Targets } from '$lib/models/effects/enums';

export interface EffectInterface {
	applyEffect(target: Targets): void;
}

export interface Status {
	technicalName: string;
	name: string;
	description: string;
	icon: string;
	active: boolean;

	applyEffects(calledBy: 'player' | 'enemy'): void;
}

export interface ContinuousEffect {
	id: string;
	technicalName: string;
	name: string;
	description: string;
	icon: string;
	active: boolean;

	applyEffects(calledBy: 'player' | 'enemy'): void;
}
