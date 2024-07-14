<script lang="ts">
	export let turnResult: string;
</script>

{#if turnResult === 'TurnWonState'}
	<div
		class="flex flex-row flex-wrap items-center justify-between w-1/2 variant-ghost-success p-6 rounded"
	>
		<p class="p">You won this turn and inflicted damages to your enemy.</p>
		<button on:click class="btn variant-filled-surface rounded-md"> New turn </button>
	</div>
{/if}

{#if turnResult === 'TurnTiedState'}
	<div
		class="flex flex-row flex-wrap items-center justify-between w-1/2 variant-ghost-surface p-6 rounded"
	>
		<p class="p">Your enemy blocked your attack.</p>
		<button on:click class="btn variant-filled-surface rounded-md"> New turn </button>
	</div>
{/if}

{#if turnResult === 'TurnLostState'}
	<div
		class="flex flex-row flex-wrap items-center justify-between w-1/2 variant-ghost-error p-6 rounded"
	>
		<p class="p">You lost the turn, your enemy inflicted damage to you.</p>
		<button on:click class="btn variant-filled-surface rounded-md"> New turn </button>
	</div>
{/if}

{#if turnResult === 'TurnBustedState'}
	<div
		class="flex flex-row flex-wrap items-center justify-between w-1/2 variant-ghost-error p-6 rounded"
	>
		<p class="p">You busted, you inflicted damages to yourself.</p>
		<button on:click class="btn variant-filled-surface rounded-md"> New turn </button>
	</div>
{/if}
