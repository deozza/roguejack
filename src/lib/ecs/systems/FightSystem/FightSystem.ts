import AttackComponent from "$lib/ecs/components/ActorComponents/AttackComponent";
import DamageComponent from "$lib/ecs/components/ActorComponents/DamageComponent";
import FightFlag from "$lib/ecs/components/ActorComponents/FightFlag";
import type { Entity } from "$lib/ecs/entities";
import AbstractSystem from "../AbstractSystem";

export default class FightSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([AttackComponent, FightFlag]);
    constructor() {
        super();
    }

    update(entities: Set<Entity>) {        
        if(this.enabled === false) {
            return;
        }
        this.setDamageComponents(entities);
    }

    private setDamageComponents(entities: Set<Entity>): void {
        if(entities.size !== 2) {
            return;
        }

        const entitiesArray: Entity[] = Array.from(entities);
        const entity1: Entity = entitiesArray[0];
        const entity2: Entity = entitiesArray[1];

        const attackComponent1: AttackComponent | undefined = this.getComponentFromEntity(entity1, AttackComponent) as AttackComponent;
        const attackComponent2: AttackComponent | undefined = this.getComponentFromEntity(entity2, AttackComponent) as AttackComponent;

        let damageComponent1: DamageComponent = new DamageComponent(0);
        let damageComponent2: DamageComponent = new DamageComponent(0);

        if(attackComponent1.attack > attackComponent2.attack) {
            damageComponent2.damage = attackComponent1.attack - attackComponent2.attack;
            damageComponent2.damage += attackComponent1.bonusAttack;
            damageComponent2.damage *= attackComponent1.currentMultiplier;
        }else{
            damageComponent1.damage = attackComponent2.attack - attackComponent1.attack;
            damageComponent1.damage += attackComponent2.bonusAttack;
            damageComponent1.damage *= attackComponent2.currentMultiplier;
        }

        this.gameLoop.addComponent(entity1, damageComponent1);
        this.gameLoop.addComponent(entity2, damageComponent2);

        this.gameLoop.removeComponent(entity1, FightFlag);
        this.gameLoop.removeComponent(entity2, FightFlag);
    }
}