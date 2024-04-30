<script lang="ts">
	import type { HandStore } from "$lib/stores/hand";

    export let currentHand: HandStore;
    export let opponentHand: HandStore;
</script>

<div class="flex flex-row justify-center items-center w-full">
    <span class="text-4xl text-red-500">

        {#if opponentHand.isBusted === true}
            {#if currentHand.isBusted === true}
                <iconify-icon icon="game-icons:broken-axe"></iconify-icon>
                {currentHand.score - 21}
            {/if}
        {:else}
            {#if currentHand.isBusted === true}
                <iconify-icon icon="game-icons:broken-axe"></iconify-icon>
                {currentHand.score - 21}
            {:else if currentHand.isBlackJack === true}
                <iconify-icon icon="game-icons:magic-axe"></iconify-icon>
                {currentHand.score}
            {:else}
                <iconify-icon icon="game-icons:battle-axe"></iconify-icon>
                {currentHand.score}
            {/if}
        {/if}
    </span>
</div>