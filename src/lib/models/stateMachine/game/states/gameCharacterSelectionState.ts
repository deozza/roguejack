import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameCharacterSelectionState extends DefaultState implements StateInterface {
	public name: string = 'GameCharacterSelectionState';

	constructor() {
		super();
	}

	public onStateEnter(): void {
		super.onStateEnter(this.name)
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit(this.name)
	}
}

