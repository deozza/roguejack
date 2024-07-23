import { get } from "svelte/store";
import type { ContinuousEffect } from "../interfaces";
import type { Game } from "$lib/models/game/model";
import { gameStore } from "$lib/stores/game";
import Sword from "$lib/models/items/weapons/sword";
import { EnnemyType } from "$lib/models/characters/types";

export default class Bravery implements ContinuousEffect {
	id: string = crypto.randomUUID();
    technicalName: string = 'bravery';
	name: string = 'Bravery';
	description: string = 'Generate a sword when facing a semiboss or a boss';
	icon: string = 'game-icons:sword-brandish';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{state: 'onStateExit_TurnPlayerInitState', callback: () => this.onStateExit_TurnPlayerInit(calledBy)},
		]
	}

	public onStateExit_TurnPlayerInit(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore)

		if(calledBy === 'enemy'){
			gameStore.addToInventory(new Sword(), calledBy);
			return;
		}

		if(game.getCurrentBattle()?.enemy.type === EnnemyType.miniboss || game.getCurrentBattle()?.enemy.type === EnnemyType.miniboss) {
			gameStore.addToInventory(new Sword(), calledBy);
		}
	}

}