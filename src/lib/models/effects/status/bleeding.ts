import { Damage } from '$lib/models/damage/model';
import { gameStore } from '$lib/stores/game';
import type {Status } from '../interfaces';

export default class Bleeding implements Status {
	technicalName: string = 'bleeding';
	name: string = 'Bleeding';
	description: string = 'Inflicts 1 at the start of the turn. Ends at the end of the battle';
	icon: string = 'game-icons:blood';
	active: boolean = false;
	defaultAmount: number = 1;
	currentAmount: number = 1;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnPlayerInitState',
				callback: () => this.onStateEnter_TurnPlayerInitState(calledBy)
			},
			{
				state: 'onStateEnter_TurnEnemyInitState',
				callback: () => this.onStateEnter_TurnEnemyInitState(calledBy)
			},
			{
				state: 'onStateExit_BattleWonState',
				callback: () => this.onStateExit_BattleWonState(calledBy)
			}
		];
	}

	public onStateEnter_TurnPlayerInitState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			return;
		}

		const damage: Damage = new Damage();
		damage.totalDamage = this.currentAmount;

		gameStore.inflictDamagesToPlayer(damage);
	}

	public onStateEnter_TurnEnemyInitState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			return;
		}
		const damage: Damage = new Damage();
		damage.totalDamage = this.currentAmount;

		gameStore.inflictDamagesToEnemy(damage);
	}

	public onStateExit_BattleWonState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.removeStatusFromPlayer(this, true);

			return;
		}

		gameStore.removeStatusFromEnemy(this, true);
	}
}
