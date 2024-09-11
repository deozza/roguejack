import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import type { Status } from '../interfaces';
import type { Hand } from '$lib/models/hand/model';
import type { Card } from '$lib/models/card/model';

export default class Scared implements Status {
	technicalName: string = 'scared';
	name: string = 'Scared';
	description: string =
		'Drawn card has a 50% chance to be immediately discard. Lasts until an attack hits or at the end of the battle.';
	icon: string = 'game-icons:surprised-skull';
	active: boolean = false;
	defaultAmount: number = 1;
	currentAmount: number = 1;

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
				callback: () => this.removeStatus(calledBy)
			},
			{
				state: 'onStateEnter_TurnWonState',
				callback: () => this.removeStatus(calledBy)
			}
		];
	}

	public onStateExit_TurnPlayerDrawingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			return;
		}

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

	public removeStatus(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			gameStore.removeStatusFromPlayer(this, true);

			return;
		}

		gameStore.removeStatusFromEnemy(this, true);
	}
}
