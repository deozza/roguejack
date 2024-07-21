import { DefaultState } from '../..';

export default class GamePausedState extends DefaultState {
	public name: string = 'GamePausedState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

