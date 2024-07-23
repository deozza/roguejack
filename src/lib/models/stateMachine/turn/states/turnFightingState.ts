
import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';

export default class TurnFightingState extends DefaultState {
	public name: string = 'TurnFightingState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
		gameStore.resolveFight();
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}