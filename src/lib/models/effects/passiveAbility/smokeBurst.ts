import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../interfaces';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Blinded from '../status/blinded';

export default class SmokeBurst implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'smokeBurst';
	name: string = 'Smoke burst';
	description: string = 'Inflicts blindness at the end of the fight.';
	icon: string = 'game-icons:smoke-bomb';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateExit_TurnLostState',
				callback: () => this.applyStatus(calledBy)
			},
			{
				state: 'onStateExit_TurnWonState',
				callback: () => this.applyStatus(calledBy)
			}
		];
	}

	public applyStatus(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);

		if (calledBy === 'enemy') {
			
			if(game.player.status.findIndex((status) => status.technicalName === this.technicalName) !== -1) {
				return
			}

			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Blinded()];
			});

			gameStore.addStatusToPlayer(new Blinded());
			return;
		}

		if(game.getCurrentBattle()?.enemy.status.findIndex((status) => status.technicalName === this.technicalName) !== -1) {
			return
		}


		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return [...sideEffects, new Blinded()];
		});

		gameStore.addStatusToEnemy(new Blinded());

		return;
	}
}
