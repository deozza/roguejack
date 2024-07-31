import type { Damage } from '$lib/models/damage/model';
import type { ArmorInterface } from '$lib/models/items/interfaces';
import { DefaultCharacter, type CharacterInterface } from '..';

export interface PlayerInterface extends CharacterInterface {}

export class Player extends DefaultCharacter {
    public takeDamage(damage: Damage): DefaultCharacter {
        this.armors.forEach((armor: ArmorInterface) => {
            damage = armor.applyEffects('player', damage);
        });

		return super.takeDamage(damage);   
    }
}

