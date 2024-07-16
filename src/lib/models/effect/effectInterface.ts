export default interface EffectInterface {
	name: string;
	description: string;
	enableOnBattleState: string;
	enableOnPlayerTurnState: string;
	enableOnEnemyTurnState: string;
	icon: string;

	effect(data: object): void;
}
