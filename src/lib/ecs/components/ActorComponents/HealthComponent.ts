import type ComponentInterface from "../ComponentInterface";

export default class HealthComponent implements ComponentInterface {
    public maxHealth: number;
    public currentHealth: number;

    constructor(health: number) {
        this.maxHealth = health;
        this.currentHealth = health;
    }
}