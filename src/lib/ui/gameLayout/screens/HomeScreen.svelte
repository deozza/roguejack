<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { fade } from 'svelte/transition';

	gameStore.reset();
	playerSideEffectsStore.set([]);
	enemySideEffectsStore.set([]);

	function startNewGame() {
		$gameMachineState = $gameMachineState.listenToEvent({ name: 'NEW_GAME', data: null });
	}
</script>

<section
	class="container h-full mx-auto flex flex-col justify-center items-center space-y-10"
	id="home-screen"
>
	<div class="flex flex-col items-center justify-center">
		<h1 class="h1">Welcome to Roguejack</h1>
	</div>

	<div class="flex flex-col items-center justify-center text-center w-9/12 space-y-4">
		<p class="p text-lg">Roguejack is a game mixing blackjack and roguelite elements.</p>
		<p class="p text-lg">
			Use your deck to build powerful hands, take advantage from the abilities of your characters
			and the weapons you collect through your journey and try to destroy your enemies.
		</p>
		<p class="p text-lg">But beware ! Do not lose all your health or run out of cards !</p>
	</div>

	<div class="flex flex-col items-center justify-center">
		<button class="btn btn-xl variant-filled-success" on:click={() => startNewGame()}>
			Enter the dungeon
		</button>
	</div>

	<div class="flex flex-col items-center justify-center">
		<h2 class="h2">How to play</h2>
		<ul class="list-disc">
			<li>Select a character</li>
			<li>Draw cards by clicking on your deck until your hand seems powerull enough</li>
			<li>Click on fight to attack your ennemy</li>
			<li>
				If your hand is more powerful than the hand of your ennemy, the difference is dealt to their
				health
			</li>
			<li>Repeat until one of you dies</li>
		</ul>
	</div>
</section>
