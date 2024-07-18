import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { delay } from '$lib/utils';
import { playerSideEffectsStore, enemySideEffectsStore } from '$lib/stores/sideEffects';

export default class MasteryOverDeath implements EffectInterface {
	technicalName: string = 'masteryOverDeath';
	name: string = 'Mastery Over Death';
	description: string = 'Deal 1 more base power for every 10 cards in the discard.';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:graveyard';
	rarity: Rarities = 'rare';
	active: boolean = false;

	public effect(data: object): void {
		const game: Game = get(gameStore);
		if (data['user'] === 'player') {
			const bonusPower: number = Math.floor(game.player.discard.cards.length / 10);

			if (bonusPower === 0) {
				return;
			}

			this.updateStore(true, [playerSideEffectsStore]);
			gameStore.update((game) => {
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForPlayer += bonusPower;
				return game;
			});
		} else {
			const bonusPower: number = Math.floor(game.getCurrentBattle().enemy.discard.cards.length / 10);

			if (bonusPower === 0) {
				return;
			}

			this.updateStore(true, [enemySideEffectsStore]);

			gameStore.update((game) => {
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForEnemy += bonusPower;
				return game;
			});
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}


	private updateStore(status: boolean, stores: any[]) {
		stores.forEach((store) => {
			store.update((effects) => {
				const index = effects.findIndex((effect) => effect.technicalName === this.technicalName);
				if(index === -1) {
					return effects;
				}

				if(effects[index].active !== undefined) {
					effects[index].active = status;
				}
				return effects;
			})
		})
	}
}
