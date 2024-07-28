<script lang="ts">
	import { sceneStore } from "$lib/stores/scene";
	import { fade } from "svelte/transition";
</script>

{#key $sceneStore}
	<div id="top" class="mt-10 h-full w-full" in:fade>
		<svelte:component this={$sceneStore} />
	</div>
{/key}