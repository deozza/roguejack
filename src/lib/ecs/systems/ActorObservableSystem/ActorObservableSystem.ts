import DeckComponent from "$lib/ecs/components/ActorComponents/DeckComponent";
import DiscardComponent from "$lib/ecs/components/ActorComponents/DiscardComponent";
import HandComponent from "$lib/ecs/components/ActorComponents/HandComponent";
import HealthComponent from "$lib/ecs/components/ActorComponents/HealthComponent";
import type { Entity } from "$lib/ecs/entities";
import AbstractSystem from "../AbstractSystem";

export default class ActorObservableSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([HealthComponent, HandComponent, DeckComponent, DiscardComponent]);
    constructor() {
        super();
    }

    update(entities: Set<Entity>) {  
    }
}