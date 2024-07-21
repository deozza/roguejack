import { DefaultState } from '../..';

export default class TurnLostState extends DefaultState {
	public name: string = 'TurnLostState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}