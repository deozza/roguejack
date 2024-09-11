import { describe, it, expect } from 'vitest';
import type { Entity } from '$lib/ecs/entities';
import GameLoop from '$lib/game/GameLoop';
import Card from '$lib/modeles/Card';
import { SuitEnum, ValueEnum } from '$lib/modeles/Card';
import HandComponent from '../../components/ActorComponents/HandComponent';
import type ComponentInterface from '../../components/ComponentInterface';
import DiscardSystem from './DiscardSystem';
import DiscardableCardComponent from '$lib/ecs/components/ActorComponents/DiscardableCardComponent';
import DiscardComponent from '$lib/ecs/components/ActorComponents/DiscardComponent';

describe('DiscardSystem tests', () => {

	it('add system to GameLoop', () => {
		const gameLoop: GameLoop = new GameLoop();
        const discardSystem: DiscardSystem = new DiscardSystem();

        gameLoop.addSystem(discardSystem);
        expect(gameLoop.systems.size).toBe(1);

        const entity: Entity = gameLoop.addEntity();

        expect(gameLoop.systems.get(discardSystem)?.size).toBe(0);

        const handComponent: HandComponent = new HandComponent([new Card(ValueEnum.ACE, SuitEnum.SPADE)]);
        gameLoop.addComponent(entity, handComponent);

        expect(gameLoop.systems.get(discardSystem)?.size).toBe(0);

        const discardComponent: DiscardComponent = new DiscardComponent([]);
        gameLoop.addComponent(entity, discardComponent);

        expect(gameLoop.systems.get(discardSystem)?.size).toBe(0);

        gameLoop.addComponent(entity, new DiscardableCardComponent(handComponent.cards[0]));

        expect(gameLoop.systems.get(discardSystem)?.size).toBe(1);
	});

    it('removes a card from the hand and put it in the discard', () => {
        const gameLoop: GameLoop = new GameLoop();
        const discardSystem: DiscardSystem = new DiscardSystem();

        gameLoop.addSystem(discardSystem);

        const entity: Entity = gameLoop.addEntity();

        const handComponent: HandComponent = new HandComponent([new Card(ValueEnum.ACE, SuitEnum.SPADE)]);
        gameLoop.addComponent(entity, handComponent);

        const discardComponent: DiscardComponent = new DiscardComponent([]);
        gameLoop.addComponent(entity, discardComponent);

        gameLoop.addComponent(entity, new DiscardableCardComponent(handComponent.cards[0]));

        expect(gameLoop.getComponents(entity)?.get(DiscardComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(1);

        gameLoop.update();

        expect(gameLoop.getComponents(entity)?.get(DiscardComponent)?.cards.length).toBe(1);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(DiscardableCardComponent)).toBeUndefined();
    });

    it('removes all cards from the hand and put it in the discard', () => {
        const gameLoop: GameLoop = new GameLoop();
        const discardSystem: DiscardSystem = new DiscardSystem();

        gameLoop.addSystem(discardSystem);

        const entity: Entity = gameLoop.addEntity();

        const handComponent: HandComponent = new HandComponent([
            new Card(ValueEnum.ACE, SuitEnum.SPADE),
            new Card(ValueEnum.TWO, SuitEnum.SPADE),
            new Card(ValueEnum.THREE, SuitEnum.SPADE),
            new Card(ValueEnum.FOUR, SuitEnum.SPADE),
            new Card(ValueEnum.FIVE, SuitEnum.SPADE),
        ]);
        gameLoop.addComponent(entity, handComponent);

        const discardComponent: DiscardComponent = new DiscardComponent([]);
        gameLoop.addComponent(entity, discardComponent);

        while(handComponent.cards.length > 0) {
            gameLoop.addComponent(entity, new DiscardableCardComponent(handComponent.cards[0]));
            gameLoop.update();
        }

        gameLoop.update();

        expect(gameLoop.getComponents(entity)?.get(DiscardComponent)?.cards.length).toBe(5);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(DiscardableCardComponent)).toBeUndefined();
    });
});