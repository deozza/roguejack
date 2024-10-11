import type ComponentInterface from "../ComponentInterface";

export default class HealComponent implements ComponentInterface {
    public healPoints: number;
    public resolved: boolean;

    constructor(healPoints: number) {
        this.healPoints = healPoints;
        this.resolved = false;
    }
}