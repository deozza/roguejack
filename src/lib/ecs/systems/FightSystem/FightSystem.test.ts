import { describe, it, expect } from 'vitest';
import type { Entity } from '$lib/ecs/entities';
import GameLoop from '$lib/game/GameLoop';
import FightSystem from './FightSystem';
import AttackComponent from '$lib/ecs/components/ActorComponents/AttackComponent';
import DamageComponent from '$lib/ecs/components/ActorComponents/DamageComponent';
import FightFlag from '$lib/ecs/components/ActorComponents/FightFlag';

describe('FightSystem tests', () => {

	it('add system to GameLoop', () => {
		const gameLoop: GameLoop = new GameLoop();
        const fightSystem: FightSystem = new FightSystem();

        gameLoop.addSystem(fightSystem);
        expect(gameLoop.systems.size).toBe(1);

        const entity1: Entity = gameLoop.addEntity();

        expect(gameLoop.systems.get(fightSystem)?.size).toBe(0);

        const attackComponent: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent);

        expect(gameLoop.systems.get(fightSystem)?.size).toBe(0);

        const fightFlag: FightFlag = new FightFlag();
        gameLoop.addComponent(entity1, fightFlag);

        expect(gameLoop.systems.get(fightSystem)?.size).toBe(1);
	});

    it("won't update if system is disabled", () => {
        const gameLoop: GameLoop = new GameLoop();
        const fightSystem: FightSystem = new FightSystem();
        fightSystem.enabled = false;

        gameLoop.addSystem(fightSystem);

        const entity1: Entity = gameLoop.addEntity();

        const attackComponent: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent);

        const fightFlag: FightFlag = new FightFlag();
        gameLoop.addComponent(entity1, fightFlag);

        gameLoop.update();

        expect(fightSystem.getComponentFromEntity(entity1, AttackComponent)).not.toBeUndefined();
        expect(attackComponent.attack).toBe(0);
    });

    it("will update if enabled but not enough entities", () => {
        const gameLoop: GameLoop = new GameLoop();
        const fightSystem: FightSystem = new FightSystem();

        gameLoop.addSystem(fightSystem);

        const entity1: Entity = gameLoop.addEntity();

        const attackComponent: AttackComponent = new AttackComponent();
        gameLoop.addComponent(entity1, attackComponent);

        const fightFlag: FightFlag = new FightFlag();
        gameLoop.addComponent(entity1, fightFlag);

        gameLoop.update();

        expect(fightSystem.getComponentFromEntity(entity1, DamageComponent)).toBeUndefined();
    });
    [{attack1: 10, attack2: 7, damage1: 0, damage2: 3}, {attack1: 7, attack2: 10, damage1: 3, damage2: 0}].forEach((attacks, index) => {
        it("adds damage according to entities attacks #" + index, () => {
            const gameLoop: GameLoop = new GameLoop();
            const fightSystem: FightSystem = new FightSystem();

            gameLoop.addSystem(fightSystem);

            const entity1: Entity = gameLoop.addEntity();
            const entity2: Entity = gameLoop.addEntity();

            const attackComponent1: AttackComponent = new AttackComponent();
            attackComponent1.attack = attacks.attack1;
            gameLoop.addComponent(entity1, attackComponent1);

            const fightFlag: FightFlag = new FightFlag();
            gameLoop.addComponent(entity1, fightFlag);

            const attackComponent2: AttackComponent = new AttackComponent();
            attackComponent2.attack = attacks.attack2;
            gameLoop.addComponent(entity2, attackComponent2);

            const fightFlag2: FightFlag = new FightFlag();
            gameLoop.addComponent(entity2, fightFlag2);

            gameLoop.update();

            expect(fightSystem.getComponentFromEntity(entity1, FightFlag)).toBeUndefined();
            expect(fightSystem.getComponentFromEntity(entity2, FightFlag)).toBeUndefined();


            expect(fightSystem.getComponentFromEntity(entity1, DamageComponent)).not.toBeUndefined();
            expect((fightSystem.getComponentFromEntity(entity1, DamageComponent) as DamageComponent).damage).toBe(attacks.damage1);
            expect(fightSystem.getComponentFromEntity(entity2, DamageComponent)).not.toBeUndefined();
            expect((fightSystem.getComponentFromEntity(entity2, DamageComponent) as DamageComponent).damage).toBe(attacks.damage2);
        });
    });

    it("apply multiplier to damages", () => {
        const gameLoop: GameLoop = new GameLoop();
        const fightSystem: FightSystem = new FightSystem();

        gameLoop.addSystem(fightSystem);

        const entity1: Entity = gameLoop.addEntity();
        const entity2: Entity = gameLoop.addEntity();

        const attackComponent1: AttackComponent = new AttackComponent();
        attackComponent1.attack = 10;
        attackComponent1.currentMultiplier = 2;
        gameLoop.addComponent(entity1, attackComponent1);

        const fightFlag: FightFlag = new FightFlag();
        gameLoop.addComponent(entity1, fightFlag);

        const attackComponent2: AttackComponent = new AttackComponent();
        attackComponent2.attack = 7;
        gameLoop.addComponent(entity2, attackComponent2);

        const fightFlag2: FightFlag = new FightFlag();
        gameLoop.addComponent(entity2, fightFlag2);

        gameLoop.update();
        expect((fightSystem.getComponentFromEntity(entity2, DamageComponent) as DamageComponent).damage).toBe(6);
    });
});