import { type Character } from "..";
import Knight from "./knight";
import Necromancer from "./necromancer";
import Villager from "./villager";

export interface Player extends Character {

    
}

export const PlayerList: Player[] = [
    new Knight(),
    new Necromancer(),
    new Villager()
]