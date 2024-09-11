import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import Berserker from '$lib/models/effects/passiveAbility/berserker';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import InflictWound from '$lib/models/effects/passiveAbility/inflictWound';
import BreastplateArmor from '$lib/models/items/armor/breastplateArmor';
import LeatherArmor from '$lib/models/items/armor/leatherArmor';

export default class Hobgoblin extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit(), getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Werewolf';
		this.technicalName = 'werewolf';
		this.maxHealth = 10;
		this.currentHealth = 10;
		this.minAttack = 16;
		this.level = 3;
		this.type = EnnemyType.boss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [new BreastplateArmor(), new LeatherArmor()];
	}
}
