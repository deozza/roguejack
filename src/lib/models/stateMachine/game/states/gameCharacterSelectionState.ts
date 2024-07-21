import { DefaultState } from '../..';

export default class GameCharacterSelectionState extends DefaultState {
	public name: string = 'GameCharacterSelectionState';

	constructor() {
		super();
	}

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

