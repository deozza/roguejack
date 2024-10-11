import GameLoop from '$lib/game/GameLoop';
import { describe, it, expect } from 'vitest';
import ActorObservableSystem from './ActorObservableSystem';
import type { Entity } from '$lib/ecs/entities';
import HealthComponent from '$lib/ecs/components/ActorComponents/HealthComponent';
import HandComponent from '$lib/ecs/components/ActorComponents/HandComponent';
import DeckComponent from '$lib/ecs/components/ActorComponents/DeckComponent';
import DiscardComponent from '$lib/ecs/components/ActorComponents/DiscardComponent';
import Card from '$lib/modeles/Card';
import DamageComponent from '$lib/ecs/components/ActorComponents/DamageComponent';
import HealthSystem from '../HealthSystem/HealthSystem';
import EnemyComponent from '$lib/ecs/components/ActorComponents/EnemyComponent';


function createGameLoop(cards: Card[] = []): GameLoop {
    const gameLoop: GameLoop = new GameLoop();

    const entity1: Entity = gameLoop.addEntity();

    const healthComponent: HealthComponent = new HealthComponent(10);
    gameLoop.addComponent(entity1, healthComponent);

    const handComponent: HandComponent = new HandComponent(cards);
    gameLoop.addComponent(entity1, handComponent);

    const deckComponent: DeckComponent = new DeckComponent(cards);
    gameLoop.addComponent(entity1, deckComponent);

    const discardComponent: DiscardComponent = new DiscardComponent(cards);
    gameLoop.addComponent(entity1, discardComponent);

    return gameLoop;
}

describe('ActorObservableSystem system', () => {
    it('add system in gameloop', () => {
        const gameLoop: GameLoop = new GameLoop();
        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        expect(gameLoop.systems.size).toBe(1);

        const entity1: Entity = gameLoop.addEntity();

        expect(gameLoop.systems.get(actorObservableSystem)?.size).toBe(0);

        const healthComponent: HealthComponent = new HealthComponent(10);
        gameLoop.addComponent(entity1, healthComponent);

        const handComponent: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity1, handComponent);

        const deckComponent: DeckComponent = new DeckComponent([]);
        gameLoop.addComponent(entity1, deckComponent);

        const discardComponent: DiscardComponent = new DiscardComponent([]);
        gameLoop.addComponent(entity1, discardComponent);

        expect(gameLoop.systems.get(actorObservableSystem)?.size).toBe(1);
    });
});

describe('ActorObservableSystem getDeckFromActor', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getDeckFromActor(newEntity)).toThrow();
    });

    it('get the deck component', () => {
        const cards: Card[] = [
            new Card('A', 'spade'),
            new Card('2', 'spade'),
            new Card('3', 'spade')
        ];

        const gameLoop: GameLoop = createGameLoop(cards);

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getDeckFromActor(entity).cards).toEqual(cards);
    });
});

describe('ActorObservableSystem getHandFromActor', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getHandFromActor(newEntity)).toThrow();
    });

    it('get the hand component', () => {
        const cards: Card[] = [
            new Card('A', 'spade'),
            new Card('2', 'spade'),
            new Card('3', 'spade')
        ];

        const gameLoop: GameLoop = createGameLoop(cards);

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getHandFromActor(entity).cards).toEqual(cards);
    });

});

describe('ActorObservableSystem getDiscardFromActor', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getDiscardFromActor(newEntity)).toThrow();
    });

    it('get the discard component', () => {
        const cards: Card[] = [
            new Card('A', 'spade'),
            new Card('2', 'spade'),
            new Card('3', 'spade')
        ];

        const gameLoop: GameLoop = createGameLoop(cards);

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getDiscardFromActor(entity).cards).toEqual(cards);
    });
});

describe('ActorObservableSystem getHealthFromActor', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getHealthFromActor(newEntity)).toThrow();
    });

    it('get the health component', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getHealthFromActor(entity).maxHealth).toBe(10);
        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(10);
    });
});

describe('ActorObservableSystem getHealthPercentage', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getHealthPercentage(newEntity)).toThrow();
    });

    it('get the health percentage', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getHealthPercentage(entity)).toBe(100);
    });

    it('updates after taking damages', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();
        gameLoop.addSystem(actorObservableSystem);

        const healthSystem: HealthSystem = new HealthSystem();
        gameLoop.addSystem(healthSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getHealthPercentage(entity)).toBe(100);

        let damageComponent: DamageComponent = new DamageComponent(4);
        gameLoop.addComponent(entity, damageComponent);

        gameLoop.update();

        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(6);
        expect(actorObservableSystem.getHealthPercentage(entity)).toBe(60);

        damageComponent = new DamageComponent(1);
        gameLoop.addComponent(entity, damageComponent);

        gameLoop.update();

        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(5);
        expect(actorObservableSystem.getHealthPercentage(entity)).toBe(50);

        damageComponent = new DamageComponent(3);
        gameLoop.addComponent(entity, damageComponent);

        gameLoop.update();

        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(2);
        expect(actorObservableSystem.getHealthPercentage(entity)).toBe(20);
    });
});


describe('ActorObservableSystem getHealthColor', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getHealthColor(newEntity)).toThrow();
    });

    it('get the health color', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getHealthColor(entity)).toBe('bg-green-500');
    });

    it('updates after taking damages', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();
        gameLoop.addSystem(actorObservableSystem);

        const healthSystem: HealthSystem = new HealthSystem();
        gameLoop.addSystem(healthSystem);
        
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(actorObservableSystem.getHealthColor(entity)).toBe('bg-green-500');

        let damageComponent: DamageComponent = new DamageComponent(4);
        gameLoop.addComponent(entity, damageComponent);

        gameLoop.update();

        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(6);
        expect(actorObservableSystem.getHealthColor(entity)).toBe('bg-yellow-500');

        damageComponent = new DamageComponent(1);
        gameLoop.addComponent(entity, damageComponent);

        gameLoop.update();

        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(5);
        expect(actorObservableSystem.getHealthColor(entity)).toBe('bg-orange-500');

        damageComponent = new DamageComponent(3);
        gameLoop.addComponent(entity, damageComponent);

        gameLoop.update();

        expect(actorObservableSystem.getHealthFromActor(entity).currentHealth).toBe(2);
        expect(actorObservableSystem.getHealthColor(entity)).toBe('bg-red-500');
    });
});

describe('ActorObservableSystem getDamageFromActor', () => {
    it('should throw if entity is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(() => actorObservableSystem.getDamageFromActor(newEntity)).toThrow();
    });

    it('should throw if component is unknown', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        expect(() => actorObservableSystem.getDamageFromActor(entity)).toThrow();
    });

    it('get the damage', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);
        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        const damageComponent: DamageComponent = new DamageComponent(4);
        gameLoop.addComponent(entity, damageComponent);

        expect(actorObservableSystem.getDamageFromActor(entity)).toEqual(damageComponent);
    });
});

describe('ActorObservableSystem hasActorBeenDamaged', () => {
    it('get if actor has been damaged', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        const healthSystem: HealthSystem = new HealthSystem();
        gameLoop.addSystem(healthSystem);

        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        const damageComponent: DamageComponent = new DamageComponent(4);
        gameLoop.addComponent(entity, damageComponent);

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(false);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);
    });

    it('should be false after 5 updates', () => {
        const gameLoop: GameLoop = createGameLoop();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        const healthSystem: HealthSystem = new HealthSystem();
        gameLoop.addSystem(healthSystem);

        const entity: Entity = Array.from(gameLoop.entities.keys())[0];

        const damageComponent: DamageComponent = new DamageComponent(4);
        gameLoop.addComponent(entity, damageComponent);

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(false);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(true);

        gameLoop.update();

        expect(actorObservableSystem.hasActorBeenDamaged(entity)).toBe(false);
    });
});

describe('ActorObservableSystem isEnemy', () => {
    it('returns false if component is not found', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        expect(actorObservableSystem.isEnemy(newEntity)).toBe(false);
    });

    it('returns true if component is found', () => {
        const gameLoop: GameLoop = createGameLoop();
        const newEntity: Entity = gameLoop.addEntity();

        const actorObservableSystem: ActorObservableSystem = new ActorObservableSystem();

        gameLoop.addSystem(actorObservableSystem);

        const enemyComponent: EnemyComponent = new EnemyComponent('base', 1, 1);
        gameLoop.addComponent(newEntity, enemyComponent);

        expect(actorObservableSystem.isEnemy(newEntity)).toBe(true);
    });
});