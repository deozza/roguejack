import type { Status } from "$lib/models/characters/status/interfaces";

export default class Bleeding implements Status {
    technicalName: string = 'bleeding';
	name: string = 'Bleeding';
	description: string = 'Inflicts 1 at the start of the turn. Ends at the end of the battle';
	icon: string = 'game-icons:blood';
	active: boolean = false;

}