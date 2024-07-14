<script lang="ts">
	export let battleResult: string;
</script>

{#if battleResult === 'BattleWonState'}
	<div
		class="flex flex-row flex-wrap items-center justify-between w-1/2 variant-ghost-success p-6 rounded"
	>
		<p class="p">You won this battle</p>
		<button on:click class="btn variant-filled-surface rounded-md"> New battle </button>
	</div>
{/if}