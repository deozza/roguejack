import { sceneStore } from '$lib/stores/scene';
import CampScreen from '$lib/ui/gameLayout/screens/CampScreen.svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class BattleCampingState extends DefaultState implements StateInterface {
	public name: string = 'BattleCampingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(CampScreen);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
