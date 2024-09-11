import type ComponentInterface from "../ComponentInterface";

export default class AttackComponent implements ComponentInterface {
    public attack: number;
    public defaultMultiplier: number;
    public bonusAttack: number;
    public currentMultiplier: number;
    public isBlackjack: boolean;

    public constructor(attack: number = 0, defaultMultiplier: number = 1, bonusAttack: number = 0) {
        this.attack = attack;
        this.defaultMultiplier = defaultMultiplier;
        this.bonusAttack = bonusAttack;
        this.currentMultiplier = defaultMultiplier;
        this.isBlackjack = false;
    }
}