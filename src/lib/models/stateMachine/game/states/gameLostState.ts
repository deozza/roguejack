import { sceneStore } from '$lib/stores/scene';
import GameLostScreen from '$lib/ui/gameLayout/screens/GameLostScreen.svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameLostState extends DefaultState implements StateInterface {
	public name: string = 'GameLostState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(GameLostScreen);

	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
