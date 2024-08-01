import { get } from 'svelte/store';
import type { ContinuousEffect, Status } from '../effects/interfaces';
import type { Game } from '../game/model';
import { gameStore } from '$lib/stores/game';

export class DefaultState {
	onStateEnter(currentStateName: string): void {
		const game: Game = get(gameStore);

		if (game.player.name !== '') {
			game.player.passiveAbilities.forEach((sideEffect: ContinuousEffect | Status) => {
				sideEffect.applyEffects('player').forEach((effect) => {
					if (effect.state === 'onStateEnter_' + currentStateName) {
						effect.callback();
					}
				});
			});

			game.player.status.forEach((sideEffect: ContinuousEffect | Status) => {
				sideEffect.applyEffects('player').forEach((effect) => {
					if (effect.state === 'onStateEnter_' + currentStateName) {
						effect.callback();
					}
				});
			});
		}

		if (game.getCurrentBattle() !== null) {
			game
				.getCurrentBattle()
				?.enemy.passiveAbilities.forEach((sideEffect: ContinuousEffect | Status) => {
					sideEffect.applyEffects('enemy').forEach((effect) => {
						if (effect.state === 'onStateEnter_' + currentStateName) {
							effect.callback();
						}
					});
				});

			game.getCurrentBattle().enemy.status.forEach((sideEffect: ContinuousEffect | Status) => {
				sideEffect.applyEffects('enemy').forEach((effect) => {
					if (effect.state === 'onStateEnter_' + currentStateName) {
						effect.callback();
					}
				});
			});
		}
	}

	onStateExit(currentStateName: string): void {
		const game: Game = get(gameStore);

		if (game.player.name !== '') {
			game.player.passiveAbilities.forEach((sideEffect: ContinuousEffect | Status) => {
				sideEffect.applyEffects('player').forEach((effect) => {
					if (effect.state === 'onStateExit_' + currentStateName) {
						effect.callback();
					}
				});
			});

			game.player.status.forEach((sideEffect: ContinuousEffect | Status) => {
				sideEffect.applyEffects('player').forEach((effect) => {
					if (effect.state === 'onStateExit_' + currentStateName) {
						effect.callback();
					}
				});
			});
		}

		if (game.getCurrentBattle() !== null) {
			game
				.getCurrentBattle()
				?.enemy.passiveAbilities.forEach((sideEffect: ContinuousEffect | Status) => {
					sideEffect.applyEffects('enemy').forEach((effect) => {
						if (effect.state === 'onStateExit_' + currentStateName) {
							effect.callback();
						}
					});
				});

			game.getCurrentBattle().enemy.status.forEach((sideEffect: ContinuousEffect | Status) => {
				sideEffect.applyEffects('enemy').forEach((effect) => {
					if (effect.state === 'onStateExit_' + currentStateName) {
						effect.callback();
					}
				});
			});
		}
	}
}
