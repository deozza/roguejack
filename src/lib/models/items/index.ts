import { randomIntFromInterval } from "$lib/utils";
import PackOfCards from "$lib/models/items/consumable/packOfCards";
import PotionOfGreaterHealing from "$lib/models/items/consumable/potionOfGreaterHealing";
import PotionOfHealing from "$lib/models/items/consumable/potionOfHealing";
import PotionOfSuperiorfHealing from "$lib/models/items/consumable/potionOfSuperiorHealing";
import { defaultRaritiesWeights, type RaritiesWeight } from "$lib/models/items/enums";
import EarthquakeScroll from "$lib/models/items/scrolls/earthquakeScroll";
import FireballScroll from "$lib/models/items/scrolls/fireballScroll";
import type { ItemTypes } from "$lib/models/items/types";
import Dagger from "$lib/models/items/weapons/dagger";
import Knife from "$lib/models/items/weapons/knife";
import Sword from "$lib/models/items/weapons/sword";


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