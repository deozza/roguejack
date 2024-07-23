import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { DefaultState } from '../..';
import type { Fight } from '$lib/models/fight/model';

export default class TurnDamageState extends DefaultState {
	public name: string = 'TurnDamageState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
		const game: Game = get(gameStore);
		const fight: Fight = game.getCurrentBattle().getCurrentTurn().fight;

		gameStore.inflictDamagesToEnemy(fight.totalDamageToEnemy * fight.multiplierForPlayer);
		gameStore.inflictDamagesToPlayer(fight.totalDamageToPlayer * fight.multiplierForEnemy);
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}
