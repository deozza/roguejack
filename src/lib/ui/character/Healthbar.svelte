<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { bounceOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let currentHealth: number;
	export let maxHealth: number;
	export let healthColor: string;
</script>

<div class="flex flex-col items-center justify-center w-full">
	<span class="text-2xl">{currentHealth}/{maxHealth}</span>
	{#key currentHealth}
		<div class="w-full" in:fly={{ x: 50, duration: 200, easing: bounceOut, opacity: 1 }}>
			<ProgressBar value={currentHealth} max={maxHealth} meter={healthColor} />
		</div>
	{/key}
</div>
