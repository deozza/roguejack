import { DefaultState } from '../..';
import { gameStore } from '$lib/stores/game';

export default class TurnPlayerBustedState extends DefaultState {
	public name: string = 'TurnPlayerBustedState';

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