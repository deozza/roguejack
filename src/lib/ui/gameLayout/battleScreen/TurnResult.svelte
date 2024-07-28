<script lang="ts">
	import type { Turn } from '$lib/models/turn/model';

	export let turn: Turn | null;
	export let battleStateName: string;
	export let turnStateName: string;
</script>

<div
	class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 variant-filled-surface p-8"
>
	<div class="flex flex-col items-center justify-center">
		<h1 class="h1 mb-20">Victory !</h1>
		<p class="p text-xl"></p>
		<p class="p text-xl">You inflicted 10 damages !</p>

		<p class="p text-2xl">You killed your enemy !</p>
		<button class="btn btn-xl variant-filled-warning" on:click> New turn </button>
	</div>
</div>
