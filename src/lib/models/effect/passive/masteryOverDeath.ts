import type { Game } from '$lib/models/game/model';
import { BattlePlayingState } from '$lib/models/stateMachine/battle/states';
import { TurnDamageState } from '$lib/models/stateMachine/turn/states/turnDamageState';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';

export default class MasteryOverDeath implements EffectInterface {
	name: string = 'Mastery Over Death';
	description: string = 'Deal 1 more base power for every 5 cards in the discard.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnDamageState';
	enableOnEnemyTurnState: string = 'TurnDamageState';
	icon: string = 'game-icons:graveyard';

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
