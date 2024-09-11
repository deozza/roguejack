import { describe, it, expect } from 'vitest';
import type { Entity } from '$lib/ecs/entities';
import GameLoop from '$lib/game/GameLoop';
import HealthSystem from './HealthSystem';
import DamageComponent from '$lib/ecs/components/ActorComponents/DamageComponent';
import HealthComponent from '$lib/ecs/components/ActorComponents/HealthComponent';
import HealComponent from '$lib/ecs/components/ActorComponents/HealComponent';

describe('HealthSystem tests', () => {
	it('add system to GameLoop', () => {
		const gameLoop: GameLoop = new GameLoop();
        const healthSystem: HealthSystem = new HealthSystem();

        gameLoop.addSystem(healthSystem);
        expect(gameLoop.systems.size).toBe(1);

        const entity1: Entity = gameLoop.addEntity();

        expect(gameLoop.systems.get(healthSystem)?.size).toBe(0);

        const healthComponent: HealthComponent = new HealthComponent(10);
        gameLoop.addComponent(entity1, healthComponent);

        expect(gameLoop.systems.get(healthSystem)?.size).toBe(1);
	});

	it('update health according to damageComponent', () => {
        const gameLoop: GameLoop = new GameLoop();
        const healthSystem: HealthSystem = new HealthSystem();

        gameLoop.addSystem(healthSystem);

        const entity1: Entity = gameLoop.addEntity();

        const healthComponent: HealthComponent = new HealthComponent(10);
        gameLoop.addComponent(entity1, healthComponent);

        const damageComponent: DamageComponent = new DamageComponent(5);
        gameLoop.addComponent(entity1, damageComponent);

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(10);
        expect(healthSystem.getComponentFromEntity(entity1, DamageComponent)).not.toBeUndefined();

        gameLoop.update();

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(5);
        expect(healthSystem.getComponentFromEntity(entity1, DamageComponent)).toBeUndefined();
	});

	it('no over damages', () => {
        const gameLoop: GameLoop = new GameLoop();
        const healthSystem: HealthSystem = new HealthSystem();

        gameLoop.addSystem(healthSystem);

        const entity1: Entity = gameLoop.addEntity();

        const healthComponent: HealthComponent = new HealthComponent(10);
        gameLoop.addComponent(entity1, healthComponent);

        const damageComponent: DamageComponent = new DamageComponent(15);
        gameLoop.addComponent(entity1, damageComponent);

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(10);
        expect(healthSystem.getComponentFromEntity(entity1, DamageComponent)).not.toBeUndefined();

        gameLoop.update();

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(0);
        expect(healthSystem.getComponentFromEntity(entity1, DamageComponent)).toBeUndefined();
	});

	it('update health according to healComponent', () => {
        const gameLoop: GameLoop = new GameLoop();
        const healthSystem: HealthSystem = new HealthSystem();

        gameLoop.addSystem(healthSystem);

        const entity1: Entity = gameLoop.addEntity();

        const healthComponent: HealthComponent = new HealthComponent(10);
		healthComponent.currentHealth = 5;
        gameLoop.addComponent(entity1, healthComponent);

        const healComponent: HealComponent = new HealComponent(3);
        gameLoop.addComponent(entity1, healComponent);

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(5);
        expect(healthSystem.getComponentFromEntity(entity1, HealComponent)).not.toBeUndefined();

        gameLoop.update();

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(8);
        expect(healthSystem.getComponentFromEntity(entity1, HealComponent)).toBeUndefined();
	});

	it('no overheal', () => {
        const gameLoop: GameLoop = new GameLoop();
        const healthSystem: HealthSystem = new HealthSystem();

        gameLoop.addSystem(healthSystem);

        const entity1: Entity = gameLoop.addEntity();

        const healthComponent: HealthComponent = new HealthComponent(10);
		healthComponent.currentHealth = 5;
        gameLoop.addComponent(entity1, healthComponent);

        const healComponent: HealComponent = new HealComponent(10);
        gameLoop.addComponent(entity1, healComponent);

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(5);
        expect(healthSystem.getComponentFromEntity(entity1, HealComponent)).not.toBeUndefined();

        gameLoop.update();

        expect((healthSystem.getComponentFromEntity(entity1, HealthComponent) as HealthComponent).currentHealth).toBe(10);
        expect(healthSystem.getComponentFromEntity(entity1, HealComponent)).toBeUndefined();
	});
});