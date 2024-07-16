<script lang="ts">
	import { characters } from '$lib/models/character/players';
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { gameStore } from '$lib/stores/game';
	import { playerSideEffectsStore } from '$lib/stores/sideEffects';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';

	function selectCharacter(character: object) {
		$gameMachineState.currentState.onStateExecute({ character });

		$gameMachineState.listenToEvent({ name: 'CHARACTER_SELECTED', data: null });
		$gameMachineState = $gameMachineState;
		$gameMachineState.currentState.onStateExecute({});

		if ($gameStore.player.sideEffect !== null) {
			$playerSideEffectsStore = [...$playerSideEffectsStore, $gameStore.player.sideEffect];
		}

		$gameMachineState.listenToEvent({ name: 'START_GAME', data: null });
		$gameMachineState = $gameMachineState;

		$battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });
		$battleMachineState = $battleMachineState;
		$battleMachineState.currentState.onStateExecute({});

		$battleMachineState.listenToEvent({ name: 'PLAY', data: null });
		$battleMachineState = $battleMachineState;

		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		enemyTurnMachineState.update((state) => {
			state.currentState = new TurnPlayingState();
			return state;
		});
	}
</script>

<section
	class="container h-full mx-auto flex flex-col justify-center items-center"
	id="character-select-screen"
>
	<div class="flex flex-col items-center justify-center h-full space-y-10">
		<h1 class="h1">Select your character</h1>
		{#each characters as character}
			<button class="btn btn-xl variant-filled-success" on:click={() => selectCharacter(character)}>
				{character.name}
			</button>
		{/each}
	</div>
</section>
