import { writable } from "svelte/store";

type State = {
    id: string,
    name: string,
    from: Array<string>,
    to: Array<string>,
    data: object|null
};

export const createStackedFMSStore = () => {
    const { update, subscribe } = writable<Array<State>>([]);

    function pushNewState(state: State){
        update((states) => {
            return [...states, state];
        });
    }

    function removeTopState(){
        update((states) => {
            states.pop();
            return states;
        });
    }

    function transitionToState(state: State){
        update((states) => {
            const currentState = states[states.length - 1];
            if(currentState === undefined){
                return states;
            }

            states = states.filter((state) => {
                return state.name !== currentState.name;
            });
            states = [...states, state];
            return states;
        });
    }

    return {
        subscribe,
        pushNewState,
        removeTopState,
        transitionToState
    };
}

export const stackedFMSStore = createStackedFMSStore();

stackedFMSStore.subscribe((states) => {

    const currentState = states[states.length - 1];
    if(currentState === undefined){
        return;
    }
    console.log(currentState.name + " " + new Date().getTime(), currentState);
})
