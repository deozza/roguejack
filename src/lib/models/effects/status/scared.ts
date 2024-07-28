import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '../interfaces';
import type { Hand } from '$lib/models/hand/model';
import type { Card } from '$lib/models/card/model';

export default class Scared implements Status {
	technicalName: string = 'scared';
	name: string = 'Scared';
	description: string =
		'Drawn card has a 50% chance to be immediately discard. Ends at the end of the battle';
	icon: string = 'game-icons:surprised-skull';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateExit_TurnPlayerDrawingState',
				callback: () => this.onStateExit_TurnPlayerDrawingState(calledBy)
			},
			{
				state: 'onStateExit_TurnEnemyDrawingState',
				callback: () => this.onStateExit_TurnEnemyDrawingState(calledBy)
			},
			{
				state: 'onStateExit_BattleWonState',
				callback: () => this.onStateExit_BattleWonState(calledBy)
			}
		];
	}

	public onStateExit_TurnPlayerDrawingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			return;
		}
		this.active = true;

		if (Math.random() >= 0.5) {
			return;
		}

		gameStore.update((game: Game) => {
			const hand: Hand = game.getCurrentBattle().getCurrentTurn().playerHand;
			const drawnCard: Card = hand.cards[hand.cards.length - 1];

			hand.removeCard(drawnCard);
			game.player.discard.discardCard(drawnCard);

			return game;
		});
	}

	public onStateExit_TurnEnemyDrawingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			return;
		}

		if (Math.random() >= 0.5) {
			return;
		}

		gameStore.update((game: Game) => {
			const hand: Hand = game.getCurrentBattle().getCurrentTurn()?.enemyHand;
			const drawnCard: Card = hand.cards[hand.cards.length - 1];

			hand.removeCard(drawnCard);
			game.getCurrentBattle()?.enemy.discard.discardCard(drawnCard);

			return game;
		});
	}

	public onStateExit_BattleWonState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
			});

			gameStore.update((game: Game) => {
				game.player.status = game.player.status.filter((effect: Status) => effect.technicalName !== this.technicalName);
				return game;
			})

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
		});

		gameStore.update((game: Game) => {
			game.getCurrentBattle().enemy.status = game.getCurrentBattle().enemy.status.filter((effect: Status) => effect.technicalName !== this.technicalName);
			return game;
		})
	}
}
