
import { DefaultState } from '../..';

export default class GameIdleState extends DefaultState {
	public name: string = 'GameIdleState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
	
}

