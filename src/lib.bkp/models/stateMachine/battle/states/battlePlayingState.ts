import { sceneStore } from '$lib/stores/scene';
import BattleScreen from '$lib/ui/gameLayout/screens/BattleScreen.svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class BattlePlayingState extends DefaultState implements StateInterface {
	public name: string = 'BattlePlayingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(BattleScreen);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
