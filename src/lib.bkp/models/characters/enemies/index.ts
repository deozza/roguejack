import { DefaultCharacter, type CharacterInterface } from '$lib/models/characters';
import { EnnemyType } from '$lib/models/characters/types';

import type { Damage } from '$lib/models/damage/model';
import type { ArmorInterface } from '$lib/models/items/interfaces';

export interface EnemyInterface extends CharacterInterface {
	minAttack: number;
	type: EnnemyType;
}

export class Enemy extends DefaultCharacter {
	minAttack: number = 0;
	type: EnnemyType = EnnemyType.standard;

	public takeDamage(damage: Damage): DefaultCharacter {
		this.armors.forEach((armor: ArmorInterface) => {
			damage = armor.applyEffects('enemy', damage);
		});

		return super.takeDamage(damage);
	}
}
