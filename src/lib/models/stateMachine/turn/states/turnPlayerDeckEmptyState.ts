import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class TurnPlayerDeckEmptyState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerDeckEmptyState';

	public onStateEnter(): void {
		super.onStateEnter(this.name)
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit(this.name)
	}
}