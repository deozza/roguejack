import type Card from "$lib/modeles/Card";
import DeckComponent from "../../components/ActorComponents/DeckComponent";
import DrawFlag from "../../components/ActorComponents/DrawFlag";
import GameOverFlag from "../../components/ActorComponents/GameOverFlag";
import HandComponent from "../../components/ActorComponents/HandComponent";
import type { Entity } from "../../entities";
import AbstractSystem from "../AbstractSystem";

export default class DrawSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([DeckComponent, HandComponent, DrawFlag]);
    constructor() {
        super();
    }
    
    update(entities: Set<Entity>) {
        if(this.enabled === false) {
            return;
        }
        
        entities.forEach((entity: Entity) => {
            this.drawCard(entity);
        });
    }

    private drawCard(entity: Entity): void {
        const card: Card | undefined = this.drawCardFromDeck(entity);
        if(card === undefined) {
            this.gameLoop.removeComponent(entity, DrawFlag);
            this.gameLoop.addComponent(entity, new GameOverFlag());

            return;
        }
        
        const handComponent: HandComponent | undefined = this.getComponentFromEntity(entity, HandComponent) as HandComponent;
        handComponent.cards.push(card);

        this.gameLoop.removeComponent(entity, DrawFlag);
    }
    
    private drawCardFromDeck(entity: Entity): Card | undefined {
        const deckComponent: DeckComponent | undefined = this.getComponentFromEntity(entity, DeckComponent) as DeckComponent;

        const card: Card | undefined = deckComponent.cards.pop();
        if(card === undefined) {
            return undefined;
        }

        return card;
    }
}