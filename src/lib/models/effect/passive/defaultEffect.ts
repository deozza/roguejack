import type EffectInterface from "../effectInterface";
import type { Rarities } from "../raritiesType";

export default class DefaultEffect implements EffectInterface {
    technicalName: string = '';
	name: string = '';
	description: string = '';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = '';
	enableOnEnemyTurnState: string = '';
	icon: string = '';
	rarity: Rarities = 'common';
	active: boolean = false;


    protected updateStore(status: boolean, stores: any[]) {
		stores.forEach((store) => {
			store.update((effects) => {
				const index = effects.findIndex((effect) => effect.technicalName === this.technicalName);
				if(index === -1) {
					return effects;
				}

				if(effects[index].active !== undefined) {
					effects[index].active = status;
				}
				return effects;
			})
		})
	}

    public effect(data: object): void {
        
    }
}