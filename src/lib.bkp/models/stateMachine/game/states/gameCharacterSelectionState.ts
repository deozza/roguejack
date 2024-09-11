import { sceneStore } from '$lib/stores/scene';
import CharacterSelectScreen from '$lib/ui/gameLayout/screens/CharacterSelectScreen.svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameCharacterSelectionState extends DefaultState implements StateInterface {
	public name: string = 'GameCharacterSelectionState';

	constructor() {
		super();
	}

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(CharacterSelectScreen);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
