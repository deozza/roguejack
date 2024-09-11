import { Categories, Ranges, Types } from '../effects/enums';
import type { ScrollInterface, WeaponInterface } from '../items/interfaces';

export class Damage {
	totalDamage: number = 0;
	bonusValue: number = 0;
	bonusDamage: number = 0;
	multiplier: number = 1;
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;

	public setDamageByItem(item: WeaponInterface | ScrollInterface): Damage {
		this.category = item.category;
		this.type = item.type;
		this.range = item.range;
		this.totalDamage = item.baseDamage;

		return this;
	}
}
