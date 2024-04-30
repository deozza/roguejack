<script lang="ts">
	import type { CardStore } from "$lib/stores/card";
    import "iconify-icon"

    export let card: CardStore;
</script>

<div class="bg-white flex flex-col items-center justify-between rounded-xl card-hover p-4 h-48 w-36 m-1 {card.suit}">
    <div class="text-start w-full">
        <iconify-icon icon={"bi:suit-"+card.suit+"-fill"}/>
    </div>
    <span class="h1 font-semibold">{card.numberValue !== null ? card.numberValue : card.figureValue} </span>
    <div class="text-end w-full">
        <iconify-icon icon={"bi:suit-"+card.suit+"-fill"} class="backward"/>
    </div>
</div>

<style>
    .spade, .club {
        color: black;
    }

    .heart, .diamond {
        color: red;
    }

    .backward {
        transform: rotate(180deg);
    }
</style>