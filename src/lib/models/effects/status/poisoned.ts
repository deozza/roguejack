import { Damage } from '$lib/models/damage/model';
import { gameStore } from '$lib/stores/game';
import type { Status } from '../interfaces';

export default class Poisoned implements Status {
	technicalName: string = 'poisoned';
	name: string = 'Poisoned';
	description: string = 'Inflicts 1 at each card drawn. Ends at the end of the battle';
	icon: string = 'game-icons:poison-bottle';
	active: boolean = false;
	defaultAmount: number = 2;
	currentAmount: number = 2;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnPlayerDrawingState',
				callback: () => this.onStateEnter_TurnPlayerDrawingState(calledBy)
			},
			{
				state: 'onStateEnter_TurnEnemyDrawingState',
				callback: () => this.onStateEnter_TurnEnemyDrawingState(calledBy)
			},
			{
				state: 'onStateExit_BattleWonState',
				callback: () => this.onStateExit_BattleWonState(calledBy)
			}
		];
	}

	public onStateEnter_TurnPlayerDrawingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			return;
		}
		const damage: Damage = new Damage();
		damage.totalDamage = this.currentAmount;

		gameStore.inflictDamagesToPlayer(damage);
	}

	public onStateEnter_TurnEnemyDrawingState(calledBy: 'player' | 'enemy') {
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
