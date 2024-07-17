export type Rarities = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface RaritiesWeight {
    weight: number;
    rarity: Rarities;
};

export const raritiesWeight: RaritiesWeight[] = [
    { rarity: 'common', weight: 40 },
    { rarity: 'uncommon', weight: 70 },
    { rarity: 'rare', weight: 85 },
    { rarity: 'epic', weight: 95 },
    { rarity: 'legendary', weight: 100 },
];