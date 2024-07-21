
import { DefaultState } from '../..';

export default class TurnIdleState extends DefaultState {
	public name: string = 'TurnIdleState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}