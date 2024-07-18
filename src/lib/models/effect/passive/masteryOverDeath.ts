import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class MasteryOverDeath implements EffectInterface {
	technicalName: string = 'masteryOverDeath';
	name: string = 'Mastery Over Death';
	description: string = 'Deal 1 more base power for every 5 cards in the discard.';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:graveyard';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			const bonusPower: number = Math.floor(game.player.discard.cards.length / 5);
			gameStore.update((game) => {
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForPlayer += bonusPower;
				return game;
			});
		} else {
			const bonusPower: number = Math.floor(game.getCurrentBattle().enemy.discard.cards.length / 5);
			gameStore.update((game) => {
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForEnemy += bonusPower;
				return game;
			});
		}
	}
}
