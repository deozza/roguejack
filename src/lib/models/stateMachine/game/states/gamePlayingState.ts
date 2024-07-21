import { DefaultState } from '../..';

export default class GamePlayingState extends DefaultState {
	public name: string = 'GamePlayingState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

