import type { Card } from '$lib/models/card/model';
import { Damage } from '$lib/models/damage/model';
import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import type { Game } from '$lib/models/game/model';
import { Rarities } from '$lib/models/items/enums';
import type { ScrollInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';

export default class GustOfWindScroll implements ScrollInterface {
	id: string = crypto.randomUUID();
	technicalName: string = 'gustOfWindScroll';
	name: string = 'Gust of wind scroll';
	description: string = 'Discard 5 cards of the opponent deck';
	icon: string = 'game-icons:wind-slap';
	category: Categories = Categories.wind;
	type: Types = Types.magical;
	range: Ranges = Ranges.far;
	rarity: Rarities = Rarities.epic;
	effects: EffectInterface[] = [];
	baseDamage: number = 0;
	defaultAmount = 1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		const damage: Damage = new Damage().setDamageByItem(this);

		if (calledBy === 'player') {
			gameStore.update((game: Game) => {
				for (let i = 0; i < 5; i++) {
					const card: Card | null = game.getCurrentBattle().enemy.deck.drawTopCard();
					if (card) {
						game.getCurrentBattle().enemy.discard.discardCard(card);
					}
				}
				return game;
			});
		}

		if (calledBy === 'enemy') {
			gameStore.update((game: Game) => {
				for (let i = 0; i < 5; i++) {
					const card: Card | null = game.player.deck.drawTopCard();
					if (card) {
						game.player.discard.discardCard(card);
					}
				}
				return game;
			});
		}
	}

	make(): ScrollInterface {
		return new GustOfWindScroll();
	}
}
