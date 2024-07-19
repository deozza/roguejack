import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { Card, faces, suits, type Face, type Suit } from '$lib/models/card/model';
import type { HealingTriggerEffectInterface } from '../interfaces';
import { EffectType } from '../types';

export default class PackOfCards implements HealingTriggerEffectInterface {
	technicalName: string = 'packOfCards';
	name: string = 'Pack of cards';
	description: string = 'Add 3 random cards to your deck';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:card-random';
	rarity: Rarities = 'common';
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				for (let i = 0; i < 3; i++) {
					game.player.deck.putCardOnTop(this.generateRandomCard());
				}
				game.player.deck.shuffleDeck();
				return game;
			});
		} else {
			gameStore.update((game) => {
				for (let i = 0; i < 3; i++) {
					game.player.deck.putCardOnTop(this.generateRandomCard());
				}
				game.player.deck.shuffleDeck();
				return game;
			});
		}
	}

	private generateRandomCard(): Card {
		const face: Face = Object.keys(faces)[
			Math.floor(Math.random() * Object.keys(faces).length)
		] as Face;
		const suite: Suit = Object.keys(suits)[
			Math.floor(Math.random() * Object.keys(suits).length)
		] as Suit;

		return new Card(suite, face);
	}
}
