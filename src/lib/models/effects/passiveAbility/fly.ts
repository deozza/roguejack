import { get } from 'svelte/store';
import type { ContinuousEffect } from '../interfaces';
import type { ItemTypes } from '$lib/models/items/types';
import { enemyUsingItemStore, playerUsingItemStore } from '$lib/stores/sideEffects';
import {  Ranges } from '../enums';

export default class Fly implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'fly';
	name: string = 'Fly';
	description: string = 'Ignores damage from close and medium range attacks and earth attacks.';
	icon: string = 'game-icons:spiky-wing';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnPlayerUsingItemState',
				callback: () => this.onStateEnter_TurnPlayerUsingItemState(calledBy)
			},
			{
				state: 'onStateEnter_TurnEnemyUsingItemState',
				callback: () => this.onStateEnter_TurnEnemyUsingItemState(calledBy)
			}
		];
	}

	public onStateEnter_TurnPlayerUsingItemState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			const item: ItemTypes | null = get(playerUsingItemStore);
			if (item === null) {
				return;
			}

			if (item.range === undefined || item.range === null) {
				return;
			}

			if (item.range === Ranges.far) {
				return;
			}

			playerUsingItemStore.set(null);

			return;
		}
	}

	public onStateEnter_TurnEnemyUsingItemState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			const item: ItemTypes | null = get(enemyUsingItemStore);
			if (item === null) {
				return;
			}

			if (item.range === undefined || item.range === null) {
				return;
			}

			if (item.range === Ranges.far) {
				return;
			}

			enemyUsingItemStore.set(null);

			return;
		}
	}
}
