import MasteryOverDeath from '$lib/models/effect/passive/masteryOverDeath';
import type { DamageTriggerEffectInterface, HealingTriggerEffectInterface, PassiveEffectInterface } from './interfaces';
import Bleeding from './passive/bleeding';
import Bravery from './passive/bravery';
import InflictWound from './passive/inflictWound';
import Poisoned from './passive/poisoned';
import SharpSword from './passive/sharpSword';
import Undead from './passive/undead';
import Vampirism from './passive/vampirism';
import Venom from './passive/venom';
import Dagger from './trigger/dagger';
import EarthquakeScroll from './trigger/earthquakeScroll';
import FireballScroll from './trigger/fireballScroll';
import Knife from './trigger/knife';
import PackOfCards from './trigger/packOfCards';
import PotionOfGreaterHealing from './trigger/potionOfGreaterHealing';
import PotionOfHealing from './trigger/potionOfHealing';
import PotionOfSuperiorfHealing from './trigger/potionOfSuperiorHealing';
import Sword from './trigger/sword';

export const passiveEffects: PassiveEffectInterface[] = [
	new MasteryOverDeath(),
	new Vampirism(),
	new Bravery(),
	new SharpSword(),
	new Undead(),
	new Venom(),
	new Poisoned(),
	new InflictWound(),
	new Bleeding(),
	new Undead()
];

export const triggerEffects: Array<HealingTriggerEffectInterface | DamageTriggerEffectInterface> = [
	new Knife(),
	new Dagger(),
	new Sword(),
	new PotionOfHealing(),
	new PotionOfGreaterHealing(),
	new PotionOfSuperiorfHealing(),
	new FireballScroll(),
	new EarthquakeScroll(),
	new PackOfCards()
];
