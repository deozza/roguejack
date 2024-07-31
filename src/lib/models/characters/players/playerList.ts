import type { Player } from ".";
import Knight from "./knight";
import Necromancer from "./necromancer";
import Villager from "./villager";

export const PlayerList: Player[] = [new Knight(), new Necromancer(), new Villager()];
