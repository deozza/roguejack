import DamageComponent from "$lib/ecs/components/ActorComponents/DamageComponent";
import HealComponent from "$lib/ecs/components/ActorComponents/HealComponent";
import HealthComponent from "$lib/ecs/components/ActorComponents/HealthComponent";
import type { Entity } from "$lib/ecs/entities";
import AbstractSystem from "../AbstractSystem";

export default class HealthSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([HealthComponent]);
    private deltaDamage: number = 0;
    private deltaHeal: number = 0;

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

        if(damageComponent.resolved === true) {
            if(this.deltaDamage < 5) {

                this.deltaDamage += 1;
                return;
            }

            this.gameLoop.removeComponent(entity, DamageComponent);
            this.deltaDamage = 0;
            return;
        }

        healthComponent.currentHealth = Math.max(healthComponent.currentHealth - damageComponent.damage, 0);
        damageComponent.resolved = true;
    }

    private heal(entity: Entity): void {
        const healthComponent: HealthComponent | undefined = this.getComponentFromEntity(entity, HealthComponent) as HealthComponent;
        const healComponent: HealComponent | undefined = this.getComponentFromEntity(entity, HealComponent) as HealComponent;

        if(healComponent === undefined) {
            return;
        }

        if(healComponent.resolved === true) {
            if(this.deltaHeal < 5) {
                this.deltaHeal += 1;
                return;
            }

            this.gameLoop.removeComponent(entity, HealComponent);
            this.deltaHeal = 0;
            return;
        }

        healthComponent.currentHealth = Math.min(healthComponent.currentHealth + healComponent.healPoints, healthComponent.maxHealth);
        healComponent.resolved = true;
    }
}