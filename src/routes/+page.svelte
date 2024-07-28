<script lang="ts">
	import { sceneStore } from "$lib/stores/scene";
	import { fade } from "svelte/transition";


</script>

<svelte:head>
	<title>
		Dungeons and Jacks
	</title>
	<meta name="description" content="Dungeons and Jacks is a game mixing blackjack and roguelite elements. Use your deck to build powerful hands, take advantage from the abilities of your characters and the weapons you collect through your journey and try to destroy your enemies." />
	<meta name="keywords" content="game,rogue,card,blackjack,dungeons,jacks,dungeons and jacks,roguelite,roguelike,deck,deck building,deckbuilding,free" />
</svelte:head>

{#key $sceneStore}
	<div id="top" class="h-full w-full" in:fade>
		<svelte:component this={$sceneStore} />
	</div>
{/key}