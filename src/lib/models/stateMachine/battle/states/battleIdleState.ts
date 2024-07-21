import { DefaultState } from '../..';

export default class BattleIdleState extends DefaultState {
	public name: string = 'BattleIdleState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}
