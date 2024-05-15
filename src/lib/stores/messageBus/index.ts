import { writable } from 'svelte/store';

type MessageBus = {
    id: number,
    event: string,
    content: any|null,
    state: string,
    prerequisites: Array<MessageBus>
}

export const createMessageBusStore = () => {
    const { update, subscribe, set } = writable<Array<MessageBus>>([]);

    function addEvent(event : string, content: any|null = null, state: string = 'sent', prerequisites: Array<MessageBus> = []) {
        update((store) => ([...store, {id: store.length+1, event, content, state, prerequisites}]));
    }

    function updateEventState(id: number, state: string){
        update((store) => store.map((event) => {
            if(event.id === id){
                event.state = state;
            }
            return event;
        }));
    }

    return {
        subscribe,
        addEvent,
        updateEventState,
        set
    };
}
  

export const messageBusStore = createMessageBusStore();
