import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import Sword from '../trigger/sword';
import type { Rarities } from '../raritiesType';

export default class SharpSword implements EffectInterface {
	technicalName: string = 'sharpSword';
	name: string = 'Sharp sword';
	description: string = 'Deals 1 more damage if winning hand has a spade card';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnDamageState';
	enableOnEnemyTurnState: string = 'TurnDamageState';
	icon: string = 'game-icons:piercing-sword';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		let bonusPower: number = 0;
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.playerHand.cards.some((card) => card.suit === 'spade')
				) {
					bonusPower = 1;
				}
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForPlayer += bonusPower;
				return game;
			});
		} else {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.enemyHand.cards.some((card) => card.suit === 'spade')
				) {
					bonusPower = 1;
				}
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForEnemy += bonusPower;
				return game;
			});
		}
	}
}
