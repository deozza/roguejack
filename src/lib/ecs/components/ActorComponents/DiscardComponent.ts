import type Card from "$lib/modeles/Card";
import type ComponentInterface from "../ComponentInterface";

export default class DiscardComponent implements ComponentInterface {
    public cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }
}