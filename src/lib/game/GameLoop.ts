import type ComponentInterface from "$lib/ecs/components/ComponentInterface";
import type { Entity } from "$lib/ecs/entities";
import type AbstractSystem from "$lib/ecs/systems/AbstractSystem";

export default class GameLoop {
    private systems = new Map<AbstractSystem, Set<Entity>>();
    public entities = new Map<Entity, Map<Function, ComponentInterface>>();

    private nextEntityId: Entity = 0;
    private entitiesToRemove: Entity[] = [];

    public update(): void {
        for (const [system, entities] of this.systems.entries()) {
            system.update(entities);
        }

        while (this.entitiesToRemove.length > 0) {
            const entityToRemove: Entity | undefined = this.entitiesToRemove.pop();
            if(entityToRemove !== undefined) {
                this.removeEntityFromSystems(entityToRemove);
            }
        }
    }

    public addEntity(): Entity {
        const entity: Entity = this.nextEntityId;
        this.entities.set(entity, new Map<Function, ComponentInterface>());
        this.nextEntityId++;

        return entity;
    }

    public removeEntity(entity: Entity): void {
        this.entitiesToRemove.push(entity);
    }

    public addComponent(entity: Entity, component: ComponentInterface): void {
        this.entities.get(entity)?.set(component.constructor, component);
        this.updateSystemEntities(entity);
    }

    public removeComponent(entity: Entity, component: Function): void {
        this.entities.get(entity)?.delete(component);
        this.updateSystemEntities(entity);
    }

    public getComponents(entity: Entity): Map<Function, ComponentInterface> | undefined{
        return this.entities.get(entity);
    }

    public addSystem(system: AbstractSystem): void {
        if(system.requiredComponents.size === 0) {
            throw new Error("System requires at least one component");
        }

        system.gameLoop = this;
        this.systems.set(system, new Set<Entity>());
        for(const [entity] of this.entities) {
            this.updateSystemEntities(entity);
        }
    }

    public removeSystem(system: AbstractSystem): void {
        this.systems.delete(system);
    }

    public getSystem(systemToFind: AbstractSystem): AbstractSystem | undefined {
        for(const [system, _] of this.systems.entries()) {
            if(system === systemToFind) {
                return system;
            }
        }

        return undefined;
    }

    private removeEntityFromSystems(entity: Entity): void {
        this.entities.delete(entity);
        for (const entities of this.systems.values()) {
            entities.delete(entity);
        }
    }

    private updateSystemEntities(entity: Entity): void {
        for (const system of this.systems.keys()) {
            if (this.entityHasAllComponents(entity, system.requiredComponents)) {
                if(!this.systems.get(system)?.has(entity)) {
                    this.systems.get(system)?.add(entity);
                }
            } else {
                this.systems.get(system)?.delete(entity);
            }
        }
    }

    private entityHasAllComponents(entity: Entity, components: Set<Function>): boolean {
        for (const component of components) {
            if (this.entities.get(entity)?.get(component) === undefined) {
                return false;
            }
        }

        return true;
    }
}