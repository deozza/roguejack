import MasteryOverDeath from '$lib/models/effect/passive/masteryOverDeath';
import type EffectInterface from './effectInterface';
import Bravery from './passive/bravery';
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

export const passiveEffects: EffectInterface[] = [
	new MasteryOverDeath(),
	new Vampirism(),
	new Bravery(),
	new SharpSword(),
	new Undead(),
	new Venom(),
	new Poisoned()
];

export const triggerEffects: EffectInterface[] = [
	new PackOfCards(),
	new Knife(),
	new Dagger(),
	new Sword(),
	new PotionOfHealing(),
	new PotionOfGreaterHealing(),
	new PotionOfSuperiorfHealing(),
	new FireballScroll(),
	new EarthquakeScroll()
];
