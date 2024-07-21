import { DefaultState } from '../..';

export default class TurnPlayerDeckEmptyState extends DefaultState {
	public name: string = 'TurnPlayerDeckEmptyState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}