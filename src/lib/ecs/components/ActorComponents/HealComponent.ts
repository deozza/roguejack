import type ComponentInterface from "../ComponentInterface";

export default class HealComponent implements ComponentInterface {
    public healPoints: number;
    constructor(healPoints: number) {
        this.healPoints = healPoints;
    }
}