import MasteryOverDeath from '$lib/models/effect/passive/masteryOverDeath';
import Vampirism from './passive/vampirism';
import Knife from './trigger/knife';

export const passiveEffects = {
	masteryOverDeath: new MasteryOverDeath(),
	vampirism: new Vampirism(),
};

export const triggerEffects = {
	knife: new Knife(),
};