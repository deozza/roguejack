import type { ContinuousEffect, Status } from '../interfaces';
import Scared from '../status/scared';
import { gameStore } from '$lib/stores/game';

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
			gameStore.addStatusToPlayer(new Scared());

			return;
		}

		gameStore.addStatusToEnemy(new Scared());
	}
}
