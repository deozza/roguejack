import type { ContinuousEffect, Status } from '../interfaces';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Scared from '../status/scared';
import { gameStore } from '$lib/stores/game';
import type { Game } from '$lib/models/game/model';

export default class Intimidation implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'intimidation';
	name: string = 'Intimidation';
	description: string = 'Scares the opponent';
	icon: string = 'game-icons:screaming';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateExit_TurnPlayerInitState',
				callback: () => this.onStateExit_TurnPlayerInit(calledBy)
			}
		];
	}

	public onStateExit_TurnPlayerInit(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Scared()];
			});

			gameStore.addStatusToPlayer(new Scared());

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return [...sideEffects, new Scared()];
		});

		gameStore.addStatusToEnemy(new Scared());
	}
}
