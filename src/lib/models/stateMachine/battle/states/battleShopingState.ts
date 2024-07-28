import { sceneStore } from '$lib/stores/scene';
import ShopScreen from '$lib/ui/gameLayout/screens/ShopScreen.svelte';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class BattleShopingState extends DefaultState implements StateInterface {
	public name: string = 'BattleShopingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
		sceneStore.set(ShopScreen);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
