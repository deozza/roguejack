import type { Status } from "$lib/models/characters/status/interfaces";

export default class Poisoned implements Status {
    technicalName: string = 'poisoned';
	name: string = 'Poisoned';
	description: string = 'Inflicts 1 at each card drawn. Ends at the end of the battle';
	icon: string = 'game-icons:poison-bottle';
	active: boolean = false;

}