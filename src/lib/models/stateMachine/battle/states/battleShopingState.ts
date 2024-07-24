import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class BattleShopingState extends DefaultState implements StateInterface {
	public name: string = 'BattleShopingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
