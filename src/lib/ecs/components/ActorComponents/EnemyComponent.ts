import type ComponentInterface from "../ComponentInterface";

export default class EnemyComponent implements ComponentInterface {
    public rank: string;
    public level: number;
    public minAttack: number;


    constructor(rank: string, level: number, minAttack: number) {
        this.rank = rank;
        this.level = level;
        this.minAttack = minAttack;
    }
}