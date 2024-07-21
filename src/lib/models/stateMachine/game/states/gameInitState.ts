import { DefaultState } from '../..';

export default class GameInitState extends DefaultState {
	public name: string = 'GameInitState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

