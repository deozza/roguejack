<script lang="ts">
	import { TurnPlayingState } from "$lib/models/stateMachine/turn/states/turnPlayingState";
import { playerTurnMachineState } from "$lib/stores/stateMachine/turn";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();


    function fight() {
        dispatch('fight');
    }
</script>


{#if $playerTurnMachineState.currentState.name === TurnPlayingState.name}
    <button
        class="btn btn-xl variant-filled-error"
        on:click={() => fight()}
    >
        Fight
    </button>
{/if}