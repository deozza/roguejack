<script lang="ts">
	import { BattleWonState } from "$lib/models/stateMachine/battle/states";
	import { TurnBustedState } from "$lib/models/stateMachine/turn/states/turnBustedState";
	import { TurnLostState } from "$lib/models/stateMachine/turn/states/turnLostState";
	import { TurnPlayingState } from "$lib/models/stateMachine/turn/states/turnPlayingState";
	import { TurnTiedState } from "$lib/models/stateMachine/turn/states/turnTiedState";
	import { TurnWonState } from "$lib/models/stateMachine/turn/states/turnWonState";
	import { battleMachineState } from "$lib/stores/stateMachine/battle";
    import { playerTurnMachineState } from "$lib/stores/stateMachine/turn";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

    const endTurnStates: string[] = [
        TurnWonState.name,
        TurnTiedState.name,
        TurnLostState.name,
        TurnBustedState.name
    ];


    function fight() {
        dispatch('fight');
    }

    function newTurn() {
        dispatch('newTurn');
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

{#if endTurnStates.includes($playerTurnMachineState.currentState.name)}
    <button
        class="btn btn-xl variant-filled-warning"
        on:click={() => newTurn()}
    >
        New turn
    </button>
{/if}