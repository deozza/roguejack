<script lang="ts">
	import { gameStore, gameMachineState } from '$lib/stores/game';

	import {
		GameCharacterSelectionState,
		GameIdleState,
		GameLostState,
		GamePlayingState
	} from '$lib/models/stateMachine/game/states';

	import { characters } from '$lib/models/character/players';
	import { Game } from '$lib/models/game/model';
	import { afterNavigate, goto } from '$app/navigation';
	import { battleMachineState } from '$lib/stores/battle';
	import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/turn';
	import { BattleMachineState } from '$lib/models/stateMachine/battle/battleMachineState';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';

	afterNavigate((to) => {
		if ($gameMachineState.currentState.constructor.name === GameLostState.name) {
			$gameMachineState.listenToEvent({ name: 'QUIT_GAME', data: null });
			$gameMachineState = $gameMachineState;
		}
	});

	function startNewGame() {
		$gameMachineState.listenToEvent({ name: 'NEW_GAME', data: null });
		$gameMachineState = $gameMachineState;
		if ($gameMachineState.currentState.constructor.name === GameCharacterSelectionState.name) {
			$gameStore = new Game();
		}
	}

	function selectCharacter(character: object) {
		$gameMachineState.listenToEvent({ name: 'CHARACTER_SELECTED', data: null });
		$gameMachineState = $gameMachineState;
		$gameMachineState.currentState.onStateExecute({ character, game: $gameStore });

		$gameMachineState.listenToEvent({ name: 'START_GAME', data: null });
		$gameMachineState = $gameMachineState;

		battleMachineState.set(new BattleMachineState());
		playerTurnMachineState.set(new TurnMachineState());
		enemyTurnMachineState.set(new TurnMachineState());

		if ($gameMachineState.currentState.constructor.name === GamePlayingState.name) {
			goto('/game');
		}
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<section class="flex flex-col items-center justify-center h-full space-y-10">
		{#if $gameMachineState.currentState.constructor.name === GameIdleState.name}
			<button class="btn btn-xl variant-filled-success" on:click={startNewGame}> New game </button>
		{/if}

		{#if $gameMachineState.currentState.constructor.name === GameCharacterSelectionState.name}
			<h1>Select your character</h1>
			{#each characters as character}
				<button
					class="btn btn-xl variant-filled-success"
					on:click={() => selectCharacter(character)}
				>
					{character.name}
				</button>
			{/each}
		{/if}
	</section>
</div>
