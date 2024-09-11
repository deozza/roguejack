import type ComponentInterface from "../ComponentInterface";

export default class DamageComponent implements ComponentInterface {
    public damage: number;
    public resolved: boolean;
    constructor(damage: number) {
        this.damage = damage;
        this.resolved = false;
    }
}