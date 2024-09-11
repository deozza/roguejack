import AttackComponent from "$lib/ecs/components/ActorComponents/AttackComponent";
import HandComponent from "$lib/ecs/components/ActorComponents/HandComponent";
import type { Entity } from "$lib/ecs/entities";
import type Card from "$lib/modeles/Card";
import AbstractSystem from "../AbstractSystem";

export default class AttackSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([HandComponent, AttackComponent]);
    constructor() {
        super();
    }

    update(entities: Set<Entity>) {        
        entities.forEach((entity: Entity) => {
            this.fight(entity);
        });
    }

    private fight(entity: Entity): void {
        const handComponent: HandComponent | undefined = this.getComponentFromEntity(entity, HandComponent) as HandComponent;
        const attackComponent: AttackComponent | undefined = this.getComponentFromEntity(entity, AttackComponent) as AttackComponent;

        attackComponent.attack = this.calculateAttack(handComponent.cards);
        attackComponent.isBlackjack = this.getIsBlackjack(handComponent.cards);
        attackComponent.currentMultiplier = this.getMultiplier(handComponent, attackComponent);
    }

    private calculateAttack(cards: Card[]): number {
        let aceValue: number = 11;
        let acesCount: number = 0;
        let attack: number = 0;

        cards.forEach((card: Card) => {
            if(card.value === "A") {
                acesCount++;

                if(attack + (aceValue * acesCount) > 21) {
                    aceValue = 1;
                }
                return;
            } 
            
            if(['J', 'Q', 'K'].includes(card.value) === true) {
                attack += 10;
                return;
            }

            attack += parseInt(card.value);
            return;
        });

        for(let i = 0; i < acesCount; i++) {
            attack += aceValue;
        }

        return attack;
    }

    private getIsBlackjack(cards: Card[]): boolean {
        if(cards.length !== 2) {
            return false;
        }

        const hasAce: boolean = cards.some((card: Card) => card.value === "A");
        const hasFigure: boolean = cards.some((card: Card) => ['J', 'Q', 'K'].includes(card.value) === true);

        return hasAce && hasFigure;
    }

    private getMultiplier(handComponent: HandComponent, attackComponent: AttackComponent): number {
        if(handComponent.cards.length === 2 && attackComponent.isBlackjack === true) {
            attackComponent.currentMultiplier++;
        }

        return attackComponent.currentMultiplier;
    }
}