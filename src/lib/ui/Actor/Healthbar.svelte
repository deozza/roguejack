<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { bounceOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let currentHealth: number;
	export let maxHealth: number;

	function getHealthColor(): string {
		if (getHealthPercentage() > 0.75) {
			return 'bg-green-500';
		}

		if (getHealthPercentage() > 0.5) {
			return 'bg-yellow-500';
		}

		if (getHealthPercentage() > 0.25) {
			return 'bg-orange-500';
		}

		return 'bg-red-500';
	}

	function getHealthPercentage(): number {
		return (currentHealth / maxHealth) * 100;
	}
</script>

<div class="flex flex-col items-center justify-center w-full">
	<span class="text-2xl">{currentHealth}/{maxHealth}</span>
	{#key currentHealth}
		<div class="w-full" in:fly={{ x: 50, duration: 200, easing: bounceOut, opacity: 1 }}>
			<ProgressBar value={currentHealth} max={maxHealth} meter={getHealthColor()} />
		</div>
	{/key}
</div>
