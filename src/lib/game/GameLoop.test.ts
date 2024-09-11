import { describe, it, expect } from 'vitest';
import AbstractSystem from '$lib/ecs/systems/AbstractSystem';
import type ComponentInterface from '$lib/ecs/components/ComponentInterface';
import GameLoop from './GameLoop';
import type { Entity } from '$lib/ecs/entities';


class TestComponent1 implements ComponentInterface {
}


class TestSystem1 extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([TestComponent1]);
    constructor() {
        super();
    }
}

class TestSystem2 extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([]);
    constructor() {
        super();
    }
}

describe('GameLoop tests', () => {
	it('adding entity to GameLoop', () => {
		const gameLoop: GameLoop = new GameLoop();

        expect(gameLoop.entities.size).toBe(0);
        gameLoop.addEntity();
        expect(gameLoop.entities.size).toBe(1);
	});

    it('adding multiple entities to GameLoop increments id', () => {
		const gameLoop: GameLoop = new GameLoop();
        
        expect(gameLoop.entities.size).toBe(0);
        
        const entity1: Entity = gameLoop.addEntity();
        expect(gameLoop.entities.size).toBe(1);
        expect(entity1).toBe(0);

        const entity2: Entity = gameLoop.addEntity();
        expect(gameLoop.entities.size).toBe(2);
        expect(entity2).toBe(1);
	});

    it('removing entity from GameLoop', () => {
        const gameLoop: GameLoop = new GameLoop();


        const entity: Entity = gameLoop.addEntity();
        expect(gameLoop.entities.size).toBe(1);

        gameLoop.removeEntity(entity);
        expect(gameLoop.entities.size).toBe(1);

        gameLoop.update();
        expect(gameLoop.entities.size).toBe(0);
    });

    it('adding component to entity', () => {
        const gameLoop: GameLoop = new GameLoop();

        const entity: Entity = gameLoop.addEntity();

        const component: TestComponent1 = new TestComponent1();

        expect(gameLoop.entities.get(entity)?.size).toBe(0);

        gameLoop.addComponent(entity, component);
        expect(gameLoop.entities.get(entity)?.size).toBe(1);

        expect(gameLoop.entities.get(entity)?.keys()).toContain(TestComponent1);
    });

    it('removing component from entity', () => {
        const gameLoop: GameLoop = new GameLoop();

        const entity: Entity = gameLoop.addEntity();

        const component: TestComponent1 = new TestComponent1();
        gameLoop.addComponent(entity, component);

        expect(gameLoop.entities.get(entity)?.size).toBe(1);
        expect(gameLoop.entities.get(entity)?.keys()).toContain(TestComponent1);

        gameLoop.removeComponent(entity, TestComponent1);

        expect(gameLoop.entities.get(entity)?.size).toBe(0);
        expect(gameLoop.entities.get(entity)?.keys()).not.toContain(TestComponent1);
    });

    it('adding invalid system to GameLoop', () => {
        const gameLoop: GameLoop = new GameLoop();

        const system: TestSystem2 = new TestSystem2();
        expect(gameLoop.systems.size).toBe(0);

        expect(() => gameLoop.addSystem(system)).toThrowError();
    });

    it('adding system to GameLoop', () => {
        const gameLoop: GameLoop = new GameLoop();

        const system: TestSystem1 = new TestSystem1();
        expect(gameLoop.systems.size).toBe(0);

        gameLoop.addSystem(system);
        expect(gameLoop.systems.size).toBe(1);
    });

    it('removing system from GameLoop', () => {
        const gameLoop: GameLoop = new GameLoop();

        const system: TestSystem1 = new TestSystem1();
        expect(gameLoop.systems.size).toBe(0);

        gameLoop.addSystem(system);
        expect(gameLoop.systems.size).toBe(1);

        gameLoop.removeSystem(system);
        expect(gameLoop.systems.size).toBe(0);
    });

    it('adding system, then adding entity with matching component', () => {
        const gameLoop: GameLoop = new GameLoop();

        const entity: Entity = gameLoop.addEntity();

        const system: TestSystem1 = new TestSystem1();
        gameLoop.addSystem(system);
        expect(gameLoop.systems.get(system)?.size).toBe(0);

        const component: TestComponent1 = new TestComponent1();
        gameLoop.addComponent(entity, component);
        expect(gameLoop.systems.get(system)?.size).toBe(1);
    });

    it('removing required component removes the entity from the system', () => {
        const gameLoop: GameLoop = new GameLoop();

        const entity: Entity = gameLoop.addEntity();
        const component: TestComponent1 = new TestComponent1();
        gameLoop.addComponent(entity, component);
        const system: TestSystem1 = new TestSystem1();
        gameLoop.addSystem(system);

        expect(gameLoop.systems.get(system)?.size).toBe(1);

        gameLoop.removeComponent(entity, TestComponent1);
        expect(gameLoop.systems.get(system)?.size).toBe(0);
    });

    it('removing entity removes it from systems', () => {
        const gameLoop: GameLoop = new GameLoop();

        const entity: Entity = gameLoop.addEntity();
        const component: TestComponent1 = new TestComponent1();
        gameLoop.addComponent(entity, component);
        const system: TestSystem1 = new TestSystem1();
        gameLoop.addSystem(system);

        expect(gameLoop.systems.get(system)?.size).toBe(1);

        gameLoop.removeEntity(entity);
        expect(gameLoop.systems.get(system)?.size).toBe(1);

        gameLoop.update();
        expect(gameLoop.systems.get(system)?.size).toBe(0);
    });

});