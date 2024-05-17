import { get, writable, type Writable } from "svelte/store";

export type Turn = {
    id: string;
    turn: number;
};

const createTurnStore = () => {
    const store: Writable<Turn> = writable<Turn>({
        id: '',
        turn: 0,
    });

    function getTurn() {
        return get(store);
    }

    function generateTurn() {
        store.update((state) => {
            state.id = crypto.randomUUID();
            state.turn = 0;
            return state;
        });
    }

    return {
        generateTurn,
        getTurn,
    };
}

export const turnStore = createTurnStore();