import type { Character } from "$lib/models/characters";
import { EnnemyType } from "$lib/models/characters/types";
import Owlbear from "$lib/models/characters/enemies/boss/owlbear";
import Wolf from "$lib/models/characters/enemies/boss/wolf";
import Boar from "$lib/models/characters/enemies/miniboss/boar";
import Kobold from "$lib/models/characters/enemies/miniboss/kobold";
import VampireBat from "$lib/models/characters/enemies/miniboss/vampireBat";
import Zombie from "$lib/models/characters/enemies/miniboss/zombie";
import Rat from "$lib/models/characters/enemies/standard/rat";
import Slime from "$lib/models/characters/enemies/standard/slime";
import Spider from "$lib/models/characters/enemies/standard/spider";
import Snake from "./standard/snake";
import Werewolf from "./boss/werewolf";
import GiantEagle from "./miniboss/giantEagle";
import Myconid from "./standard/myconid";
import Goblin from "./miniboss/goblin";
import Ghost from "./standard/ghost";

export interface Enemy extends Character {
    minAttack: number;   
    type: EnnemyType;
}

const enemyList: Enemy[] = [
    new Owlbear(),
    new Wolf(),
    new Boar(),
    new Kobold(),
    new VampireBat(),
    new Zombie(),
    new Rat(),
    new Slime(),
    new Spider(),
    new Snake(),
    new Werewolf(),
    new GiantEagle(),
    new Myconid(),
    new Goblin(),
    new Ghost()
];

export function getRandomEnemyByLevelAndType(level: number, type: EnnemyType): Enemy {
    const enemies = enemyList.filter(enemy => enemy.level === level && enemy.type === type);
    const enemy: Enemy = enemies[Math.floor(Math.random() * enemies.length)];
    enemy.make();

    return enemy;
}