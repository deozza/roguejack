import type { ContinuousEffect, Status } from '../interfaces';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import Scared from '../status/scared';
import { gameStore } from '$lib/stores/game';
import type { Game } from '$lib/models/game/model';

export default class Intimidation implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'bravery';
	name: string = 'Bravery';
	description: string = 'Generate a sword when facing a semiboss or a boss';
	icon: string = 'game-icons:sword-brandish';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateExit_TurnPlayerInitState',
				callback: () => this.onStateExit_TurnPlayerInit(calledBy)
			}
		];
	}

	public onStateExit_TurnPlayerInit(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return [...sideEffects, new Scared()];
			});

			gameStore.update((game: Game) => {
				game.player.status = [...game.player.status, new Scared()];
				return game;
			})

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return [...sideEffects, new Scared()];
		});


		gameStore.update((game: Game) => {
			game.getCurrentBattle().enemy.status = [...game.getCurrentBattle().enemy.status, new Scared()];
			return game;
		})
	}
}
