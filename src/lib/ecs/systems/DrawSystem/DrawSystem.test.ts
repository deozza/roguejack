import { describe, it, expect } from 'vitest';
import type { Entity } from '$lib/ecs/entities';
import GameLoop from '$lib/game/GameLoop';
import DrawSystem from './DrawSystem';
import DeckComponent from '../../components/ActorComponents/DeckComponent';
import Card from '$lib/modeles/Card';
import { SuitEnum, ValueEnum } from '$lib/modeles/Card';
import HandComponent from '../../components/ActorComponents/HandComponent';
import DrawFlag from '../../components/ActorComponents/DrawFlag';
import type ComponentInterface from '../../components/ComponentInterface';
import GameOverFlag from '../../components/ActorComponents/GameOverFlag';

describe('DrawSystem tests', () => {

    const deck : () => Card[] = () => {
        let cards: Card[] = [];
        for(const suit of Object.values(SuitEnum)) {
            for(const value of Object.values(ValueEnum)) {
                cards.push(new Card(value, suit));
            }
        }
        return cards;
    }

	it('add system to GameLoop', () => {
		const gameLoop: GameLoop = new GameLoop();
        const drawSystem: DrawSystem = new DrawSystem();

        gameLoop.addSystem(drawSystem);
        expect(gameLoop.systems.size).toBe(1);

        const entity: Entity = gameLoop.addEntity();

        expect(gameLoop.systems.get(drawSystem)?.size).toBe(0);

        const deckComponent: DeckComponent = new DeckComponent(deck());
        gameLoop.addComponent(entity, deckComponent);

        expect(gameLoop.systems.get(drawSystem)?.size).toBe(0);

        const handComponent: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity, handComponent);

        expect(gameLoop.systems.get(drawSystem)?.size).toBe(0);

        gameLoop.addComponent(entity, new DrawFlag());

        expect(gameLoop.systems.get(drawSystem)?.size).toBe(1);
	});

    it('draws a card from the deck', () => {
        const gameLoop: GameLoop = new GameLoop();
        const drawSystem: DrawSystem = new DrawSystem();

        gameLoop.addSystem(drawSystem);

        const entity: Entity = gameLoop.addEntity();

        const deckComponent: DeckComponent = new DeckComponent(deck());
        gameLoop.addComponent(entity, deckComponent);

        const handComponent: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity, handComponent);

        gameLoop.addComponent(entity, new DrawFlag());

        expect(gameLoop.getComponents(entity)?.get(DeckComponent)?.cards.length).toBe(52);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(0);

        gameLoop.update();

        expect(gameLoop.getComponents(entity)?.get(DeckComponent)?.cards.length).toBe(51);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(1);
        expect(gameLoop.getComponents(entity)?.get(DrawFlag)).toBeUndefined();
    });

    it('draws from empty adds GameOverFlag', () => {
        const gameLoop: GameLoop = new GameLoop();
        const drawSystem: DrawSystem = new DrawSystem();

        gameLoop.addSystem(drawSystem);

        const entity: Entity = gameLoop.addEntity();

        const deckComponent: DeckComponent = new DeckComponent([]);
        gameLoop.addComponent(entity, deckComponent);

        const handComponent: HandComponent = new HandComponent([]);
        gameLoop.addComponent(entity, handComponent);

        gameLoop.addComponent(entity, new DrawFlag());

        expect(gameLoop.getComponents(entity)?.get(DeckComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(GameOverFlag)).toBeUndefined();

        gameLoop.update();

        expect(gameLoop.getComponents(entity)?.get(DeckComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(HandComponent)?.cards.length).toBe(0);
        expect(gameLoop.getComponents(entity)?.get(DrawFlag)).toBeUndefined();
        expect(gameLoop.getComponents(entity)?.get(GameOverFlag)).not.toBe(undefined);
        
    });

});