import MasteryOverDeath from '$lib/models/effect/passive/masteryOverDeath';
import Bravery from './passive/bravery';
import Vampirism from './passive/vampirism';
import Dagger from './trigger/dagger';
import Knife from './trigger/knife';
import Sword from './trigger/sword';

export const passiveEffects = {
	masteryOverDeath: new MasteryOverDeath(),
	vampirism: new Vampirism(),
	bravery: new Bravery(),
};

export const triggerEffects = {
	knife: new Knife(),
	dagger: new Dagger(),
	sword: new Sword()
};