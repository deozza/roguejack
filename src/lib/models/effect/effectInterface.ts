import type { Rarities } from "./raritiesType";

export default interface EffectInterface {
	technicalName: string;
	name: string;
	description: string;
	enableOnBattleState: string;
	enableOnPlayerTurnState: string;
	enableOnEnemyTurnState: string;
	icon: string;
	rarity: Rarities;

	effect(data: object): void;
}
