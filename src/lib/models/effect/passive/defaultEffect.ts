import type { PassiveEffectInterface } from '../interfaces';
import type { EffectType } from '../types';

export default class DefaultEffect implements PassiveEffectInterface {
	technicalName: string = '';
	name: string = '';
	description: string = '';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = '';
	enableOnEnemyTurnState: string = '';
	icon: string = '';
	active: boolean = false;
	effectType: EffectType;

	protected updateStore(status: boolean, stores: any[]) {
		stores.forEach((store) => {
			store.update((effects) => {
				const index = effects.findIndex((effect) => effect.technicalName === this.technicalName);
				if (index === -1) {
					return effects;
				}

				if (effects[index].active !== undefined) {
					effects[index].active = status;
				}
				return effects;
			});
		});
	}

	public effect(data: object): void {}
}
