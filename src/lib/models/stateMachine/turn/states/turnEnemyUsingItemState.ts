
import { enemyUsingItemStore } from '$lib/stores/sideEffects';
import { get } from 'svelte/store';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';
import type { ItemTypes } from '$lib/models/items/types';
import { gameStore } from '$lib/stores/game';

export default class TurnEnemyUsingItemState extends DefaultState implements StateInterface {
	public name: string = 'TurnEnemyUsingItemState';

	public onStateEnter(): void {
		super.onStateEnter(this.name)
	}

	public onStateExecute(): void {
		const item: ItemTypes | null = get(enemyUsingItemStore);

		if(item == null) {
			return;
		}

		item.applyEffects('enemy');
		gameStore.removeFromInventory(item, 'enemy');
	}

	public onStateExit(): void {
		super.onStateExit(this.name)
		enemyUsingItemStore.set(null);
	}
}