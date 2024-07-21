import type { Categories, Ranges, Types } from "../effects/enums";
import type { EffectInterface } from "../effects/interfaces";
import type { Rarities } from "./enums";

interface ItemInterface {
    technicalName: string;
    name: string;
    description: string;
    rarity: Rarities;
    icon: string;
    effects: EffectInterface[];

    applyEffects(): void;
}

export interface WeaponInterface extends ItemInterface {
    category: Categories;
    type: Types;
    range: Ranges;
}

export interface ArmorInterface extends ItemInterface {
    category: Categories;
    weakToType: Types[];
    resitantTo: Types[];
}

export interface ConsumableInterface extends ItemInterface {
    category: Categories;
    type: Types;
}

export interface ScrollInterface extends ItemInterface {
    category: Categories;
    type: Types;
    range: Ranges;
}

export interface AmuletInterface extends ItemInterface {
    category: Categories;
}