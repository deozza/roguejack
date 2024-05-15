<script lang="ts">
import {stackedFMSStore} from '$lib/stores/stackedFMS';
import {gameStore} from '$lib/stores/game';
import {playerCharacterStore} from '$lib/stores/character';
import {playerDeckStore} from '$lib/stores/deck';
import {battleStore} from '$lib/stores/battle';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

onMount(()=>{
    stackedFMSStore.subscribe((states)=>{
        const currentState = states[states.length - 1];

        if(currentState !== undefined && currentState.name == 'turn.start'){        
            goto('/game');
        }
    })
})

function startNewGame() {
    stackedFMSStore.pushNewState({
        id:'',
        name: 'game.init',
        from: [],
        to: [],
        data: null
    })
}
</script>


<button class="btn btn-xl variant-filled-success" on:click={startNewGame}>
    New game
</button>