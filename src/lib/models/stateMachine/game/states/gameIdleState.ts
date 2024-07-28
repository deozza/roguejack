import { gameStore } from '$lib/stores/game';
import { sceneStore } from '$lib/stores/scene';
import HomeScreen from '$lib/ui/gameLayout/screens/HomeScreen.svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameIdleState extends DefaultState implements StateInterface {
	public name: string = 'GameIdleState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(HomeScreen);

	}

	public onStateExecute(): void {
		gameStore.reset();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
