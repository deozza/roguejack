import { sceneStore } from '$lib/stores/scene';
import PauseScreen from '$lib/ui/gameLayout/screens/PauseScreen.svelte';
import type { SvelteComponent } from 'svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';
import { get } from 'svelte/store';

export default class GamePausedState extends DefaultState implements StateInterface {
	public name: string = 'GamePausedState';
	private lastScene: SvelteComponent;

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		this.lastScene = get(sceneStore);
	}

	public onStateExecute(): void {
		sceneStore.set(PauseScreen);
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
		sceneStore.set(this.lastScene);
	}
}
