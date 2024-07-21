import type { PassiveAbility } from "./interfaces";

export default class Bravery implements PassiveAbility {
    technicalName: string = 'bravery';
	name: string = 'Bravery';
	description: string = 'Generate a sword when facing a semiboss or a boss';
	icon: string = 'game-icons:sword-brandish';
	active: boolean = false;

}