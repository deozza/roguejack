import DefaultCharacter from "..";
import type { Player } from "../interfaces";
import Knight from "./knight";
import Necromancer from "./necromancer";
import Villager from "./villager";

export default class DefaultPlayerCharacter extends DefaultCharacter implements Player {
    
}

export const PlayerList: Player[] = [
    new Knight(),
    new Necromancer(),
    new Villager()
]