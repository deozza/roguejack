import type { Damage } from '$lib/models/damage/model';
import type { ArmorInterface } from '$lib/models/items/interfaces';
import { DefaultCharacter, type CharacterInterface } from '..';

export interface PlayerInterface extends CharacterInterface {}

export class Player extends DefaultCharacter {
    public takeDamage(damage: Damage): DefaultCharacter {

        console.log('Player takeDamage');
        console.log(damage);

        this.armors.forEach((armor: ArmorInterface) => {
            damage = armor.applyEffects('player', damage);
        });

        console.log(damage);

		return super.takeDamage(damage);   
    }
}

