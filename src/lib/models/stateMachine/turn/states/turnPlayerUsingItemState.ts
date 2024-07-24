import type { ItemTypes } from '$lib/models/items/types';
import { get } from 'svelte/store';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';
import { playerUsingItemStore } from '$lib/stores/sideEffects';
import { gameStore } from '$lib/stores/game';

export default class TurnPlayerUsingItemState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerUsingItemState';

	public onStateEnter(): void {
		super.onStateEnter(this.name)
	}

	public onStateExecute(): void {
		const item: ItemTypes | null = get(playerUsingItemStore);

		if(item == null) {
			return;
		}

		item.applyEffects('player');
		gameStore.removeFromInventory(item, 'player');
	}

	public onStateExit(): void {
		super.onStateExit(this.name)
		playerUsingItemStore.set(null);
	}
}
