import { Damage } from '$lib/models/damage/model';
import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import type { Game } from '$lib/models/game/model';
import { Rarities } from '$lib/models/items/enums';
import type { ScrollInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';

export default class FireballScroll implements ScrollInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'fireballScroll';
	name: string = 'Fireball scroll';
	description: string = 'Deals 10 damages. You pass your turn and destroy 5 of your cards';
	icon: string = 'game-icons:fireball';
	category: Categories = Categories.fire;
	type: Types = Types.magical;
	range: Ranges = Ranges.far;
	rarity: Rarities = Rarities.epic;
	effects: EffectInterface[] = [];
	baseDamage: number = 10;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		const damage: Damage = new Damage().setDamageByItem(this);

		if (calledBy === 'player') {
			gameStore.inflictDamagesToEnemy(damage);
			gameStore.update((game: Game) => {
				for (let i = 0; i < 5; i++) {
					game.player.deck.drawTopCard;
				}
				return game;
			});
		}

		if (calledBy === 'enemy') {
			gameStore.inflictDamagesToPlayer(damage);
			gameStore.update((game: Game) => {
				for (let i = 0; i < 5; i++) {
					game.getCurrentBattle().enemy.deck.drawTopCard;
				}
				return game;
			});
		}
	}

	make(): ScrollInterface {
		return new FireballScroll();
	}
}
