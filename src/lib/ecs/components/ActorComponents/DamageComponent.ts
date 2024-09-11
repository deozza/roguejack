import type ComponentInterface from "../ComponentInterface";

export default class DamageComponent implements ComponentInterface {
    public damage: number;
    constructor(damage: number) {
        this.damage = damage;
    }
}