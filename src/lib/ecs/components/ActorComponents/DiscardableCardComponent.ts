import type Card from "$lib/modeles/Card";
import type ComponentInterface from "../ComponentInterface";

export default class DiscardableCardComponent implements ComponentInterface {
    public card: Card;

    constructor(card: Card) {
        this.card = card;
    }
}