import { randomIntFromInterval } from "$lib/utils";
import PackOfCards from "./consumable/packOfCards";
import PotionOfGreaterHealing from "./consumable/potionOfGreaterHealing";
import PotionOfHealing from "./consumable/potionOfHealing";
import PotionOfSuperiorfHealing from "./consumable/potionOfSuperiorHealing";
import { defaultRaritiesWeights, type RaritiesWeight } from "./enums";
import EarthquakeScroll from "./scrolls/earthquakeScroll";
import FireballScroll from "./scrolls/fireballScroll";
import type { ItemTypes } from "./types";
import Dagger from "./weapons/dagger";
import Knife from "./weapons/knife";
import Sword from "./weapons/sword";


const items: ItemTypes[] = [
    new PackOfCards(),
    new PotionOfHealing(),
    new PotionOfGreaterHealing(),
    new PotionOfSuperiorfHealing(),
    new EarthquakeScroll(),
    new FireballScroll(),
    new Dagger(),
    new Knife(),
    new Sword()
];

export function getRandomItemByWeight(raritiesWeight: RaritiesWeight[] = defaultRaritiesWeights): ItemTypes {
    const rarityWeightValue: number = randomIntFromInterval(1, 100);

    const rarity: RaritiesWeight | undefined = raritiesWeight.find(
        (rarity) => rarity.weight >= rarityWeightValue
    );
    if (rarity === undefined) {
        throw new Error(`Rarity ${rarityWeightValue} not found`);
    }

    const filteredEffects: Array<ItemTypes> =
        items.filter(
            (item: ItemTypes) =>
                item.rarity === rarity.rarity
        );

    const randomEffectIndex: number = randomIntFromInterval(0, filteredEffects.length - 1);
    return items[randomEffectIndex];
}