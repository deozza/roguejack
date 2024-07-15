export default interface EffectInterface {
    name: string;
    description: string;
    enableOnBattleState: string;
    enableOnTurnState: string;
    
    effect(data: object): void;
}