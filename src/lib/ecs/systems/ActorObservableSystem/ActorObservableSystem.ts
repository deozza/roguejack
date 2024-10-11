import DamageComponent from "$lib/ecs/components/ActorComponents/DamageComponent";
import DeckComponent from "$lib/ecs/components/ActorComponents/DeckComponent";
import DiscardComponent from "$lib/ecs/components/ActorComponents/DiscardComponent";
import HandComponent from "$lib/ecs/components/ActorComponents/HandComponent";
import HealthComponent from "$lib/ecs/components/ActorComponents/HealthComponent";
import type { Entity } from "$lib/ecs/entities";
import AbstractSystem from "../AbstractSystem";

export default class ActorObservableSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([HealthComponent, HandComponent, DeckComponent, DiscardComponent]);
    constructor() {
        super();
    }

    update(entities: Set<Entity>) {  
    }

    public getDeckFromActor(actor: Entity): DeckComponent {
        const component: DeckComponent | undefined = this.getComponentFromEntity(actor, DeckComponent) as DeckComponent;

        if(component === undefined) {
            throw new Error(`The actor ${actor} is not present in the system or does not have this component`);
        }

        return component;
    }

    public getHandFromActor(actor: Entity): HandComponent {
        const component: HandComponent | undefined = this.getComponentFromEntity(actor, HandComponent) as HandComponent;

        if(component === undefined) {
            throw new Error(`The actor ${actor} is not present in the system or does not have this component`);
        }

        return component;
    }

    public getDiscardFromActor(actor: Entity): DiscardComponent {
        const component: DiscardComponent | undefined = this.getComponentFromEntity(actor, DiscardComponent) as DiscardComponent;

        if(component === undefined) {
            throw new Error(`The actor ${actor} is not present in the system or does not have this component`);
        }

        return component;
    }

    public getHealthFromActor(actor: Entity): HealthComponent {
        const component: HealthComponent | undefined = this.getComponentFromEntity(actor, HealthComponent) as HealthComponent;

        if(component === undefined) {
            throw new Error(`The actor ${actor} is not present in the system or does not have this component`);
        }

        return component;
    }

    public getHealthColor(actor: Entity): string {
		if (this.getHealthPercentage(actor) > 75) {
			return 'bg-green-500';
		}

		if (this.getHealthPercentage(actor) > 50) {
			return 'bg-yellow-500';
		}

		if (this.getHealthPercentage(actor) > 25) {
			return 'bg-orange-500';
		}

		return 'bg-red-500';
	}

	public getHealthPercentage(actor: Entity): number {
        const healthComponent: HealthComponent = this.getHealthFromActor(actor);

		return (healthComponent.currentHealth / healthComponent.maxHealth) * 100;
	}


    public getDamageFromActor(actor: Entity): DamageComponent {
        const damageComponent: DamageComponent | undefined = this.getComponentFromEntity(actor, DamageComponent) as DamageComponent;

        if(damageComponent === undefined) {
            throw new Error(`The actor ${actor} is not present in the system or does not have this component`);
        }

        return damageComponent;
    }

    public hasActorBeenDamaged(actor: Entity): boolean {
        try {
            const damageComponent: DamageComponent | undefined = this.getDamageFromActor(actor);

            if(damageComponent === undefined) {
                return false;
            }

            if(damageComponent.resolved === false) {
                return false;
            }

            return damageComponent.damage > 0;
        } catch(e) {
            return false;
        }
    }

}