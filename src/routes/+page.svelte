<script lang="ts">

	import { goto } from '$app/navigation';
	import { gameStore, type Game } from '$lib/stores/game';
	import { onMount } from 'svelte';


	function startNewGame() {


	}
</script>

<button class="btn btn-xl variant-filled-success" on:click={startNewGame}> New game </button>
