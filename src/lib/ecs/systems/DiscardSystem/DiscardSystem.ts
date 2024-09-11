import DiscardableCardComponent from "$lib/ecs/components/ActorComponents/DiscardableCardComponent";
import DiscardComponent from "$lib/ecs/components/ActorComponents/DiscardComponent";
import HandComponent from "$lib/ecs/components/ActorComponents/HandComponent";
import type { Entity } from "$lib/ecs/entities";
import type Card from "$lib/modeles/Card";
import AbstractSystem from "../AbstractSystem";

export default class DiscardSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([DiscardComponent, HandComponent, DiscardableCardComponent]);

    constructor() {
        super();
    }

    update(entities: Set<Entity>) {
        if(this.enabled === false) {
            return;
        }
        
        entities.forEach((entity: Entity) => {
            this.discardCard(entity);
        });
    }

    private discardCard(entity: Entity): void {
        const handComponent: HandComponent | undefined = this.getComponentFromEntity(entity, HandComponent) as HandComponent;
        const discardComponent: DiscardComponent | undefined = this.getComponentFromEntity(entity, DiscardComponent) as DiscardComponent;
        const discardableCardComponent: DiscardableCardComponent | undefined = this.getComponentFromEntity(entity, DiscardableCardComponent) as DiscardableCardComponent;

        const card: Card | undefined = handComponent.cards.find((card: Card) => card === discardableCardComponent.card);

        if(card === undefined) {
            this.gameLoop.removeComponent(entity, DiscardableCardComponent);
            return;
        }

        handComponent.cards.splice(handComponent.cards.indexOf(card), 1);
        discardComponent.cards.push(card);
        this.gameLoop.removeComponent(entity, DiscardableCardComponent);
    }
}