import { gameStore } from '$lib/stores/game';
import type { Status } from '../interfaces';

export default class Blinded implements Status {
	technicalName: string = 'blinded';
	name: string = 'Blinded';
	description: string = '75% chances to hide the drawn cards and their values.';
	icon: string = 'game-icons:blindfold';
	active: boolean = false;
	defaultAmount: number = 1;
	currentAmount: number = 1;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnEnemyInitState',
				callback: () => this.removeStatus(calledBy)
			},
			{
				state: 'onStateEnter_TurnPlayerBustedState',
				callback: () => this.removeStatus(calledBy)
			},
			{
				state: 'onStateEnter_TurnPlayerEmptyDeckState',
				callback: () => this.removeStatus(calledBy)
			}
		];
	}

	public removeStatus(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.removeStatusFromPlayer(this, true);

			return;
		}
	}
}
