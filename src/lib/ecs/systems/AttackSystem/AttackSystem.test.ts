import { describe, it, expect } from 'vitest';
import type { Entity } from '$lib/ecs/entities';
import GameLoop from '$lib/game/GameLoop';
import Card from '$lib/modeles/Card';
import { SuitEnum, ValueEnum } from '$lib/modeles/Card';
import HandComponent from '../../components/ActorComponents/HandComponent';
import AttackSystem from './AttackSystem';
import AttackComponent from '$lib/ecs/components/ActorComponents/AttackComponent';

describe('AttackSystem tests', () => {

	it('add system to GameLoop', () => {
		const gameLoop: GameLoop = new GameLoop();
        const attackSystem: AttackSystem = new AttackSystem();
        attackSystem.enabled = false;

        gameLoop.addSystem(attackSystem);
        expect(gameLoop.systems.size).toBe(1);

        const entity1: Entity = gameLoop.addEntity();

        expect(gameLoop.systems.get(attackSystem)?.size).toBe(0);

        const handComponent: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity1, handComponent);

        expect(gameLoop.systems.get(attackSystem)?.size).toBe(0);

        const attackComponent: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent);

        expect(gameLoop.systems.get(attackSystem)?.size).toBe(1);
	});

    it('update attackComponent according to hand', () => {
		const gameLoop: GameLoop = new GameLoop();
        const attackSystem: AttackSystem = new AttackSystem();
        attackSystem.enabled = false;

        gameLoop.addSystem(attackSystem);

        const entity1: Entity = gameLoop.addEntity();

        const handComponent1: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity1, handComponent1);

        const attackComponent1: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent1);

        gameLoop.update();

        expect(attackComponent1.attack).toBe(0);

        handComponent1.cards.push(new Card(ValueEnum.FIVE, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(5);

        handComponent1.cards.push(new Card(ValueEnum.SIX, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(11);
	});

    it('handle ace value', () => {
		const gameLoop: GameLoop = new GameLoop();
        const attackSystem: AttackSystem = new AttackSystem();
        attackSystem.enabled = false;

        gameLoop.addSystem(attackSystem);

        const entity1: Entity = gameLoop.addEntity();

        const handComponent1: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity1, handComponent1);

        const attackComponent1: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent1);

        gameLoop.update();

        expect(attackComponent1.attack).toBe(0);

        handComponent1.cards.push(new Card(ValueEnum.TEN, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(10);

        handComponent1.cards.push(new Card(ValueEnum.ACE, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(21);

        handComponent1.cards.push(new Card(ValueEnum.ACE, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(12);
	});

    it('handle figure value', () => {
		const gameLoop: GameLoop = new GameLoop();
        const attackSystem: AttackSystem = new AttackSystem();
        attackSystem.enabled = false;

        gameLoop.addSystem(attackSystem);

        const entity1: Entity = gameLoop.addEntity();

        const handComponent1: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity1, handComponent1);

        const attackComponent1: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent1);

        gameLoop.update();

        expect(attackComponent1.attack).toBe(0);

        handComponent1.cards.push(new Card(ValueEnum.JACK, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(10);

        handComponent1.cards.push(new Card(ValueEnum.QUEEN, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(20);

        handComponent1.cards.push(new Card(ValueEnum.KING, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.attack).toBe(30);
	});

    [ValueEnum.JACK, ValueEnum.QUEEN, ValueEnum.KING].forEach((value: ValueEnum) => {
        it('handle blackjack', () => {
            const gameLoop: GameLoop = new GameLoop();
            const attackSystem: AttackSystem = new AttackSystem();
            attackSystem.enabled = false;
    
            gameLoop.addSystem(attackSystem);
    
            const entity1: Entity = gameLoop.addEntity();
    
            const handComponent1: HandComponent = new HandComponent([]);
            gameLoop.addComponent(entity1, handComponent1);
    
            const attackComponent1: AttackComponent = new AttackComponent();
            gameLoop.addComponent(entity1, attackComponent1);
    
            gameLoop.update();
    
            expect(attackComponent1.isBlackjack).toBe(false);
    
            handComponent1.cards.push(new Card(value, SuitEnum.CLUB));
    
            gameLoop.update();
    
            expect(attackComponent1.isBlackjack).toBe(false);
    
            handComponent1.cards.push(new Card(ValueEnum.ACE, SuitEnum.CLUB));
    
            gameLoop.update();
    
            expect(attackComponent1.isBlackjack).toBe(true);
        });
    });

    it('update currentMultiplier on blackjack', () => {
        const gameLoop: GameLoop = new GameLoop();
        const attackSystem: AttackSystem = new AttackSystem();
        attackSystem.enabled = false;

        gameLoop.addSystem(attackSystem);

        const entity1: Entity = gameLoop.addEntity();

        const handComponent1: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity1, handComponent1);

        const attackComponent1: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent1);

        gameLoop.update();

        handComponent1.cards.push(new Card(ValueEnum.KING, SuitEnum.CLUB));

        gameLoop.update();

        handComponent1.cards.push(new Card(ValueEnum.ACE, SuitEnum.CLUB));

        gameLoop.update();

        expect(attackComponent1.isBlackjack).toBe(true);
        expect(attackComponent1.currentMultiplier).toBe(2);
    });

});