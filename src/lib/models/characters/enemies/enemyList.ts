import type { Enemy } from ".";
import { EnnemyType } from "../types";
import Cockatrice from "./boss/cockatrice";
import FlyingSword from "./boss/flyingSword";
import Hobgoblin from "./boss/hobgoblin";
import Owlbear from "./boss/owlbear";
import Werewolf from "./boss/werewolf";
import Wolf from "./boss/wolf";
import Boar from "./miniboss/boar";
import Dryad from "./miniboss/dryad";
import GiantCrab from "./miniboss/giantCrab";
import GiantEagle from "./miniboss/giantEagle";
import Goblin from "./miniboss/goblin";
import Kobold from "./miniboss/kobold";
import VampireBat from "./miniboss/vampireBat";
import Worg from "./miniboss/worg";
import Zombie from "./miniboss/zombie";
import AxeBeak from "./standard/axeBeak";
import CrawlingClaw from "./standard/crawlingClaw";
import Ghost from "./standard/ghost";
import Homonculus from "./standard/homonculus";
import LivingArmor from "./standard/livingArmor";
import Myconid from "./standard/myconid";
import Rat from "./standard/rat";
import Skeleton from "./standard/skeleton";
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
	new Ghost(),
	new Homonculus(),
	new CrawlingClaw(),
	new GiantCrab(),
	new FlyingSword(),
	new AxeBeak(),
	new Skeleton(),
	new Cockatrice(),
	new Dryad(),
	new Worg(),
	new Hobgoblin(),
	new LivingArmor()
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
