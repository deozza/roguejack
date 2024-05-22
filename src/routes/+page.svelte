<script lang="ts">
	import { gameStore, gameMachineState } from '$lib/stores/game';

	import { GameCharacterSelectionState, GameIdleState, GameInitState } from '$lib/models/stateMachine/game/states';

	import {characters} from '$lib/models/character/players';
	import { Game } from '$lib/models/game/model';
	import { Character } from '$lib/models/character/model';

	function startNewGame() {
		$gameMachineState.listenToEvent({name: 'NEW_GAME', data: null});
		$gameMachineState = $gameMachineState;
		if ($gameMachineState.currentState.constructor.name === GameCharacterSelectionState.name) {
			$gameStore = new Game();
		}
	}

	function selectCharacter(character: object) {
		$gameMachineState.listenToEvent({name: 'CHARACTER_SELECTED', data: null});
		$gameMachineState = $gameMachineState;
		$gameMachineState.currentState.onStateExecute({character, game: $gameStore});

		$gameMachineState.listenToEvent({name: 'START_GAME', data: null});
		$gameMachineState = $gameMachineState;
	}

$: console.log('current state', $gameMachineState.currentState.constructor.name);
$: console.log('game', $gameStore);

</script>

{#if $gameMachineState.currentState.constructor.name === GameIdleState.name}
	<button class="btn btn-xl variant-filled-success" on:click={startNewGame}> New game </button>
{/if}

{#if $gameMachineState.currentState.constructor.name === GameCharacterSelectionState.name}
	<h1> Select your character</h1>
	{#each characters as character}
		<button class="btn btn-xl variant-filled-success" on:click={() => selectCharacter(character)}> {character.name} </button>
	{/each}
{/if}

