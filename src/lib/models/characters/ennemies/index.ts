import DefaultCharacter from "..";
import type { Enemy } from "../interfaces";
import { EnnemyType } from "../types";
import Owlbear from "./boss/owlbear";
import Wolf from "./boss/wolf";
import Boar from "./miniboss/boar";
import Kobold from "./miniboss/kobold";
import VampireBat from "./miniboss/vampireBat";
import Zombie from "./miniboss/zombie";
import Rat from "./standard/rat";
import Slime from "./standard/slime";
import Snake from "./standard/snake";
import Spider from "./standard/spider";

export default class DefaultEnemyCharacter extends DefaultCharacter implements Enemy {
    minAttack: number = 0;
    type: EnnemyType = EnnemyType.standard;
}

const enemyList: Enemy[] = [
    new Rat(),
    new Slime(),
    new Snake(),
    new Spider(),
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