<script lang="ts">
	import { sceneStore } from '$lib/stores/scene';
	import { fade } from 'svelte/transition';
</script>

{#key $sceneStore}
	<div id="top" class="w-full h-full" in:fade>
		<svelte:component this={$sceneStore} />
	</div>	
{/key}
