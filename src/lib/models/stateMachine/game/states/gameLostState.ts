import { sceneStore } from '$lib/stores/scene';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameLostState extends DefaultState implements StateInterface {
	public name: string = 'GameLostState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(GameLostState);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
