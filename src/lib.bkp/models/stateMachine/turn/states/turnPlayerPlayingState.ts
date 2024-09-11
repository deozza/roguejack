import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class TurnPlayerPlayingState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerPlayingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
