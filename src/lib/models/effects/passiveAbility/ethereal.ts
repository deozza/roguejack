import type { ContinuousEffect } from '../interfaces';
import { enemyUsingItemStore, playerUsingItemStore } from '$lib/stores/sideEffects';
import type { ItemTypes } from '$lib/models/items/types';
import { Types } from '../enums';

export default class Ethereal implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'ethereal';
	name: string = 'Ethereal';
	description: string = 'Ignore physical damages from weapon and scrolls.';
	icon: string = 'game-icons:spectre';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnPlayerUsingItemState',
				callback: () => this.onStateEnter_TurnPlayerUsingItemState(calledBy)
			}
		];
	}

	public onStateEnter_TurnPlayerUsingItemState(calledBy: 'player' | 'enemy') {
		if(calledBy === 'enemy') {
			playerUsingItemStore.update((item: ItemTypes | null) => {

				if(item === null) {
					return item;
				}

				if(item.baseDamage === undefined || item.type === undefined) {
					return item;
				}

				if(item.type === Types.physical) {
					item.baseDamage = 0;
				}
				return item;
			});
		}
		
		if(calledBy === 'player') {
			enemyUsingItemStore.update((item: ItemTypes | null) => {
				if(item === null) {
					return item;
				}

				if(item.baseDamage === undefined || item.type === undefined) {
					return item;
				}

				if(item.type === Types.physical) {
					item.baseDamage = 0;
				}
				return item;
			});
		}

		return;

	}
}
