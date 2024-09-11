import type GameLoop from "$lib/game/GameLoop";
import type ComponentInterface from "../components/ComponentInterface";
import type { Entity } from "../entities";

export default abstract class AbstractSystem {
    public abstract update(entities: Set<Entity>): void;
    public abstract requiredComponents: Set<Function>;
    public gameLoop: GameLoop;
    public enabled: boolean = true;

    public getComponentFromEntity(entity: Entity, componentType: Function): ComponentInterface | undefined {
        return this.gameLoop.getComponents(entity)?.get(componentType);
    }
}