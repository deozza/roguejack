import { DefaultState } from '../..';

export default class GameLostState extends DefaultState {
	public name: string = 'GameLostState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

