import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class TurnEnemyPlayingState extends DefaultState implements StateInterface {
	public name: string = 'TurnEnemyPlayingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
