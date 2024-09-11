import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GamePausedState extends DefaultState implements StateInterface {
	public name: string = 'GamePausedState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
