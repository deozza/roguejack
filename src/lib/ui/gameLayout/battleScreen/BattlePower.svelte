<script lang="ts">
	import type { Hand } from "$lib/models/hand/model";
	import Icon from "@iconify/svelte";
    export let hand: Hand
    export let basePower: number
    export let currentStateName: string

    const endTurnStates: string[] = [
        'TurnWonState',
        'TurnTiedState',
        'TurnLostState',
        'TurnBustedState',
        'TurnDeckEmptyState',
        'TurnIdleState'
    ]

    const iconByValue = (): string => {
        console.log(currentStateName)
        if(currentStateName === 'TurnDeckEmptyState') {
            return 'game-icons:card-discard'
        }

        if (hand.getIsBusted()) {
            return 'game-icons:broken-axe'
        }

        if(hand.getIsBlackjack()) {
            return 'game-icons:magic-axe'
        }

        return 'game-icons:battle-axe'
    }

</script>

{#if endTurnStates.includes(currentStateName)}
    <div class="flex flex-row flex-wrap items-center justify-center m-4 text-4xl text-red-500">
        <p class="p">
            {hand.value}
            {basePower !== 0 ? `+ ${basePower}` : ''}
        </p>
        <Icon icon="{iconByValue()}" />
    </div>
{/if}
