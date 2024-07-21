import { DefaultState } from '../..';

export default class TurnTiedState extends DefaultState {
	public name: string = 'TurnTiedState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}
