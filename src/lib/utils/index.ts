import { browser } from '$app/environment';
import type { Battle } from '$lib/models/battle/model';
import type { CharacterInterface } from '$lib/models/characters';
import type { EnemyInterface } from '$lib/models/characters/enemies';
import type { Game } from '$lib/models/game/model';
import type { BattleMachineState } from '$lib/models/stateMachine/battle/battleMachineState';
import type { GameMachineState } from '$lib/models/stateMachine/game/gameMachineState';
import type { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
import { gameStore } from '$lib/stores/game';
import { battleMachineState } from '$lib/stores/stateMachine/battle';
import { gameMachineState } from '$lib/stores/stateMachine/game';
import { turnMachineState } from '$lib/stores/stateMachine/turn';
import { get } from 'svelte/store';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const scrollToElement = (id: string) => {
	if (browser) {
		const element = document.getElementById(id);
		element.scrollIntoView({ behavior: 'smooth' });
	}
};

export const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export async function updateBattleState() {
	let turnState: TurnMachineState = get(turnMachineState);
	let game: Game = get(gameStore);

	if (turnState.currentState.name === 'TurnEnemyDeckEmptyState') {
		battleMachineState.update((state: BattleMachineState) => {
			return state.listenToEvent({ name: 'WIN', data: null });
		});

		await redirectToCamp();

		return;
	}

	if (turnState.currentState.name === 'TurnPlayerDeckEmptyState') {
		battleMachineState.update((state: BattleMachineState) => {
			return state.listenToEvent({ name: 'LOSE', data: null });
		});

		await delay(5000);
		gameMachineState.update((state: GameMachineState) => {
			return state.listenToEvent({ name: 'END_GAME', data: null });
		});

		return;
	}

	if (game.getCurrentBattle()?.enemy.currentHealth <= 0) {
		battleMachineState.update((state: BattleMachineState) => {
			return state.listenToEvent({ name: 'WIN', data: null });
		});
		await redirectToCamp();
		return;
	}

	if (game.player.currentHealth <= 0) {
		battleMachineState.update((state: BattleMachineState) => {
			return state.listenToEvent({ name: 'LOSE', data: null });
		});

		await delay(5000);

		gameMachineState.update((state: GameMachineState) => {
			return state.listenToEvent({ name: 'END_GAME', data: null });
		});
		return;
	}
}

export async function redirectToCamp() {
	gameStore.endTurn();
	turnMachineState.update((state: TurnMachineState) => {
		return state.listenToEvent({ name: 'RESET', data: null });
	});
	
	await delay(5000);

	

	battleMachineState.update((state: BattleMachineState) => {
		return state.listenToEvent({ name: 'CAMP', data: null });
	});


}

export const enemyHasAlreadyBeenDefeated = (currentEnemy: CharacterInterface): boolean => {
	let game: Game = get(gameStore);
	let battle: Battle | undefined = game.battles.find((battle: Battle) => battle.enemy.technicalName === currentEnemy.technicalName);

	if(battle === undefined) {
		return false;
	}

	if(battle.id === game.getCurrentBattle()?.id) {
		return false;
	}

	return true;
}
