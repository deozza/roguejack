import { randomIntFromInterval } from '$lib/utils';
import PackOfCards from '$lib/models/items/consumable/packOfCards';
import PotionOfGreaterHealing from '$lib/models/items/consumable/potionOfGreaterHealing';
import PotionOfHealing from '$lib/models/items/consumable/potionOfHealing';
import PotionOfSuperiorfHealing from '$lib/models/items/consumable/potionOfSuperiorHealing';
import { defaultRaritiesWeights, type RaritiesWeight } from '$lib/models/items/enums';
import EarthquakeScroll from '$lib/models/items/scrolls/earthquakeScroll';
import FireballScroll from '$lib/models/items/scrolls/fireballScroll';
import type { ItemTypes } from '$lib/models/items/types';
import Dagger from '$lib/models/items/weapons/dagger';
import Knife from '$lib/models/items/weapons/knife';
import Sword from '$lib/models/items/weapons/sword';
import Halberd from './weapons/halberd';
import Hatchet from './weapons/hatchet';
import Spear from './weapons/spear';
import Stick from './weapons/stick';
import TwoHandedAxe from './weapons/twoHandedAxe';
import Bow from './weapons/bow';
import Crossbow from './weapons/crossbow';
import ClubArmor from './armor/clubArmor';
import HeartArmor from './armor/heartArmor';
import SpadeArmor from './armor/spadeArmor';
import DiamondArmor from './armor/diamondArmor';
import LeatherArmor from './armor/leatherArmor';
import BreastplateArmor from './armor/breastplateArmor';
import PlateArmor from './armor/plateArmor';
import GustOfWindScroll from './scrolls/gustOfWindScroll';
import StrengthPotion from './consumable/strengthPotion';
import GreaterStrengthPotion from './consumable/greaterStrengthPotion';
import SuperiorStrengthPotion from './consumable/superiorStrengthPotion';
import Antidote from './consumable/antidote';
import GreaterAntidote from './consumable/greaterAntidote';
import Bandage from './consumable/bandage';
import GreaterBandage from './consumable/greaterBandage';

const items: ItemTypes[] = [
	new PackOfCards(),
	new PotionOfHealing(),
	new PotionOfGreaterHealing(),
	new PotionOfSuperiorfHealing(),
	new EarthquakeScroll(),
	new FireballScroll(),
	new Dagger(),
	new Knife(),
	new Sword(),
	new Halberd(),
	new Hatchet(),
	new Spear(),
	new Stick(),
	new TwoHandedAxe(),
	new Bow(),
	new Crossbow(),
	new Crossbow(),
	new ClubArmor(),
	new HeartArmor(),
	new SpadeArmor(),
	new DiamondArmor(),
	new LeatherArmor(),
	new BreastplateArmor(),
	new PlateArmor(),
	new GustOfWindScroll(),
	new StrengthPotion(),
	new GreaterStrengthPotion(),
	new SuperiorStrengthPotion(),
	new Antidote(),
	new GreaterAntidote(),
	new Bandage(),
	new GreaterBandage()
];

export function getRandomItemByWeight(
	raritiesWeight: RaritiesWeight[] = defaultRaritiesWeights
): ItemTypes {
	const rarityWeightValue: number = randomIntFromInterval(1, 100);

	const rarity: RaritiesWeight | undefined = raritiesWeight.find(
		(rarity) => rarity.weight >= rarityWeightValue
	);
	if (rarity === undefined) {
		throw new Error(`Rarity ${rarityWeightValue} not found`);
	}

	const filteredItems: Array<ItemTypes> = items.filter(
		(item: ItemTypes) => item.rarity === rarity.rarity
	);

	const randomItemIndex: number = randomIntFromInterval(0, filteredItems.length - 1);
	const item: ItemTypes = filteredItems[randomItemIndex].make();

	return item;
}
