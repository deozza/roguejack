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

export interface Enemy extends Character {
    minAttack: number;   
    type: EnnemyType;
}

const enemyList: Enemy[] = [
    new Rat(),
    new Spider(),
    new Slime(),
    new Boar(),
    new Kobold(),
    new VampireBat(),
    new Zombie(),
    new Wolf(),
    new Owlbear()
];

export function getRandomEnemyByLevelAndType(level: number, type: EnnemyType): Enemy {
    const enemies = enemyList.filter(enemy => enemy.level === level && enemy.type === type);
    return enemies[Math.floor(Math.random() * enemies.length)];
}