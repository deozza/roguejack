import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class FireballScroll implements EffectInterface {
	technicalName: string = 'fireballScroll';
	name: string = 'Fireball scroll';
	description: string = 'Deals 10 damages. You pass your turn and destroy 5 of your cards';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:fireball';
	rarity: Rarities = 'epic';

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(10);
				for(let i = 0; i < 5; i++) {
					game.player.deck.drawTopCard();
				}
				return game;
			});
			gameStore.endTurn();
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(10);
				for(let i = 0; i < 5; i++) {
					game.getCurrentBattle()?.enemy.deck.drawTopCard();
				}
				return game;
			});
			gameStore.endTurn();
		}
	}
}
