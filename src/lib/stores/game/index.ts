import type { Character } from "../character";
import type { Battle } from "../battle";
import { get, writable, type Writable } from "svelte/store";

export type Game = {
    id: string;
    player: Character;
    battles: Array<Battle>;
};

const createGameStore = () => {
    const store: Writable<Game> = writable<Game>({
        id: '',
        player: {
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
        battles: []
    });

    function getGame() {
        return get(store);
    }

    function generateGame(player: Character) {
        store.update((state) => {
            state.player = player;
            state.id = crypto.randomUUID();
            return state;
        });
    }

    return {
        generateGame,
        getGame,
    };
}

export const gameStore = createGameStore();