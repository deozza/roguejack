import DamageComponent from "$lib/ecs/components/ActorComponents/DamageComponent";
import HealComponent from "$lib/ecs/components/ActorComponents/HealComponent";
import HealthComponent from "$lib/ecs/components/ActorComponents/HealthComponent";
import type { Entity } from "$lib/ecs/entities";
import AbstractSystem from "../AbstractSystem";

export default class HealthSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([HealthComponent]);
    constructor() {
        super();
    }

    update(entities: Set<Entity>) {  
        if(this.enabled === false) {
            return;
        }

        entities.forEach((entity: Entity) => {
            this.inflictDamage(entity);
            this.heal(entity);
        });
    }

    private inflictDamage(entity: Entity): void {

        const healthComponent: HealthComponent | undefined = this.getComponentFromEntity(entity, HealthComponent) as HealthComponent;
        const damageComponent: DamageComponent | undefined = this.getComponentFromEntity(entity, DamageComponent) as DamageComponent;

        if(damageComponent === undefined) {
            return;
        }

        healthComponent.currentHealth = Math.max(healthComponent.currentHealth - damageComponent.damage, 0);

        this.gameLoop.removeComponent(entity, DamageComponent);
    }

    private heal(entity: Entity): void {
        const healthComponent: HealthComponent | undefined = this.getComponentFromEntity(entity, HealthComponent) as HealthComponent;
        const healComponent: HealComponent | undefined = this.getComponentFromEntity(entity, HealComponent) as HealComponent;

        if(healComponent === undefined) {
            return;
        }

        healthComponent.currentHealth = Math.min(healthComponent.currentHealth + healComponent.healPoints, healthComponent.maxHealth);
        this.gameLoop.removeComponent(entity, HealComponent);
    }
}