import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../interfaces';
import { gameStore } from '$lib/stores/game';
import Charmed from '../status/charmed';

export default class Charm implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'charm';
	name: string = 'charm';
	description: string = 'If the enemy draws a heart card, 30% chance to charm them';
	icon: string = 'game-icons:charm';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateExit_TurnPlayerDrawingState',
				callback: () => this.onStateExit_TurnPlayerDrawingState(calledBy)
			}
		];
	}

	public onStateExit_TurnPlayerDrawingState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);

		if (calledBy === 'player') {
			return;
		}

		if (game.player.status.findIndex((status) => status.technicalName === 'charmed') !== -1) {
			return;
		}

		if (
			game
				.getCurrentBattle()
				?.getCurrentTurn()
				?.playerHand.cards.findIndex((card) => card.suit === 'heart') === -1
		) {
			return;
		}

		if (Math.random() > 0.3) return;

		gameStore.addStatusToPlayer(new Charmed());
	}
}
