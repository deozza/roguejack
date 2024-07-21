import { DefaultState } from '../..';

export default class TurnEnemyDeckEmptyState extends DefaultState {
	public name: string = 'TurnEnemyDeckEmptyState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

