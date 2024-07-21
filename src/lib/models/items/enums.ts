export enum Rarities {
    common,
    uncommon,
    rare,
    epic,
    legendary
}

export interface RaritiesWeight {
    weight: number;
    rarity: Rarities;
}

export let raritiesWeight: RaritiesWeight[] = [
	{ rarity: Rarities.common, weight: 40 },
	{ rarity: Rarities.uncommon, weight: 70 },
	{ rarity: Rarities.rare, weight: 85 },
	{ rarity: Rarities.epic, weight: 95 },
	{ rarity: Rarities.legendary, weight: 100 }
];
