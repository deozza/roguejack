import { get, writable, type Writable } from "svelte/store";
import type { Character } from "../character";
import type { Turn } from "../turn";

export type Battle = {
    id: string;
    enemy: Character;
    battle: number;
    turns: Array<Turn>;
};

const createBattleStore = () => {
    const store: Writable<Battle> = writable<Battle>({
        id: '',
        enemy: {
            name: '',
            level: 1,
            maxHealth: 10,
            currentHealth: 10,
            deck: {
                cards: []
            },
            discard: {
                cards: []
            }
        },
        battle: 0,
        turns: []
    });

    function getBattle() {
        return get(store);
    }

    function generateBattle(enemy: Character) {
        store.update((state) => {
            state.enemy = enemy;
            state.id = crypto.randomUUID();
            return state;
        });
    }

    return {
        generateBattle,
        getBattle,
    };
}

export const battleStore = createBattleStore();