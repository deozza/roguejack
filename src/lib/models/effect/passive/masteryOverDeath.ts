import { BattlePlayingState } from "$lib/models/stateMachine/battle/states";
import { TurnFightingState } from "$lib/models/stateMachine/turn/states/turnFightingState";
import type EffectInterface from "../effectInterface";

export default class MasteryOverDeath implements EffectInterface{
    name: string = "Mastery Over Death";
    description: string = "Deal 1 more base damage for every 5 cards in the discard.";
    enableOnBattleState: string = BattlePlayingState.name;
    enableOnTurnState: string = TurnFightingState.name;
    
    public effect(data: object): void {
        
    }
}