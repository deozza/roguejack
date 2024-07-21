import { DefaultState } from '../..';

export default class TurnWonState extends DefaultState {
	public name: string = 'TurnWonState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}