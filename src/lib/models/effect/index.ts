import MasteryOverDeath from '$lib/models/effect/passive/masteryOverDeath';
import Bravery from './passive/bravery';
import Vampirism from './passive/vampirism';
import Dagger from './trigger/dagger';
import Knife from './trigger/knife';
import PotionOfGreaterHealing from './trigger/potionOfGreaterHealing';
import PotionOfHealing from './trigger/potionOfHealing';
import PotionOfSuperiorfHealing from './trigger/potionOfSuperiorHealing copy';
import Sword from './trigger/sword';

export const passiveEffects = {
	masteryOverDeath: new MasteryOverDeath(),
	vampirism: new Vampirism(),
	bravery: new Bravery()
};

export const triggerEffects = {
	knife: new Knife(),
	dagger: new Dagger(),
	sword: new Sword(),
	potionOfHealing: new PotionOfHealing(),
	potionOfGreaterHealing: new PotionOfGreaterHealing(),
	potionOfSuperiorHealing: new PotionOfSuperiorfHealing()
};
