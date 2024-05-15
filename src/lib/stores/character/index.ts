import { derived, writable } from "svelte/store";

export type Character = {
    name: string;
    level: number;
    maxHealth: number;
    currentHealth: number;
};

export const createCharacterStore = () => {
    const { subscribe, set, update } = writable<Character>({
        name: '',
        level: 1,
        maxHealth: 10,
        currentHealth: 10,
    });

    function takeDamage(damage: number) {
        update((state) => {
            state.currentHealth = Math.max(state.currentHealth - damage, 0);
            return state;
        });
    }

    function heal(heal: number) {
        update((state) => {
            state.currentHealth = Math.min(state.currentHealth + heal, state.maxHealth);
            return state;
        });
    }

    return {
        subscribe,
        set,
        update,
        takeDamage,
        heal
    };
}

export function getHealthColor(character: Character) {
    if (character.currentHealth / character.maxHealth > 0.75) {
        return 'bg-green-500';
    }
    
    if (character.currentHealth / character.maxHealth > 0.50) {
        return 'bg-yellow-500';
    } 
    
    if (character.currentHealth / character.maxHealth > 0.25) {
        return 'bg-orange-500';
    }

    return 'bg-red-500'
}