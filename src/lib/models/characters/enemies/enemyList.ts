import type { Enemy } from ".";
import { EnnemyType } from "../types";
import Owlbear from "./boss/owlbear";
import Werewolf from "./boss/werewolf";
import Wolf from "./boss/wolf";
import Boar from "./miniboss/boar";
import GiantEagle from "./miniboss/giantEagle";
import Goblin from "./miniboss/goblin";
import Kobold from "./miniboss/kobold";
import VampireBat from "./miniboss/vampireBat";
import Zombie from "./miniboss/zombie";
import Ghost from "./standard/ghost";
import Myconid from "./standard/myconid";
import Rat from "./standard/rat";
import Slime from "./standard/slime";
import Snake from "./standard/snake";
import Spider from "./standard/spider";

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

	let enemies: Enemy[] = [];

	if(type === EnnemyType.standard) {
		enemies = enemyList.filter((enemy) => enemy.level >= (level - 1) && enemy.level <= level && enemy.type === type);
	}else {
		enemies = enemyList.filter((enemy) => enemy.level === level && enemy.type === type);
	}

	const enemy: Enemy = enemies[Math.floor(Math.random() * enemies.length)];
	enemy.make();

	return enemy;
}
