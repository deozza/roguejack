<script lang="ts">
	import { GameCharacterSelectionState } from '$lib/models/stateMachine/game/states';
	import { gameStore } from '$lib/stores/game';
	import { gameMachineState } from '$lib/stores/stateMachine/game';

    function startNewGame() {
		$gameMachineState.listenToEvent({ name: 'NEW_GAME', data: null });
		$gameMachineState = $gameMachineState;
		if ($gameMachineState.currentState.constructor.name === GameCharacterSelectionState.name) {
			gameStore.reset();
		}
	}
</script>


<section class="container h-full mx-auto flex flex-col justify-center items-center" id="home-screen">
	<div class="flex flex-col items-center justify-center h-full space-y-10">
		<button class="btn btn-xl variant-filled-success" on:click={() => startNewGame()}> New game </button>
    </div>
</section>