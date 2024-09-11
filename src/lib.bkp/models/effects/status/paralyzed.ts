import { gameStore } from '$lib/stores/game';
import { turnMachineState } from '$lib/stores/stateMachine/turn';
import type { Status } from '../interfaces';

export default class Paralyzed implements Status {
	technicalName: string = 'paralyzed';
	name: string = 'Paralyzed';
	description: string = 'Skip this turn';
	icon: string = 'game-icons:cancel';
	active: boolean = false;
	defaultAmount: number = 1;
	currentAmount: number = 1;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{ state: 'onStateEnter_TurnPlayerPlayingState', callback: () => this.skipTurn() },
			{ state: 'onStateEnter_TurnEnemyPlayingState', callback: () => this.skipTurn() },
			{
				state: 'onStateExit_TurnFightingState',
				callback: () => this.onStateExit_TurnFightingState(calledBy)
			}
		];
	}

	public skipTurn() {
		turnMachineState.update((state) => {
			state = state.listenToEvent({ name: 'DAMAGE', data: null });

			return state;
		});
	}

	public onStateExit_TurnFightingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.removeStatusFromPlayer(this, true);

			return;
		}

		gameStore.removeStatusFromEnemy(this, true);
	}
}
