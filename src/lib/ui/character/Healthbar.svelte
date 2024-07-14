<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton";

    export let currentHealth: number;
    export let maxHealth: number;

    function getMeterColor(): string {
        if (currentHealth > maxHealth * 0.75) {
            return "bg-green-500";
        } else if (currentHealth > maxHealth * 0.5) {
            return "bg-yellow-500";
        } else if (currentHealth > maxHealth * 0.25) {
            return "bg-orange-500";
        } else {
            return "bg-red-500";
        }
    }

</script>

<div class="flex flex-col items-center justify-center w-full">
    <span class="text-2xl">{currentHealth}/{maxHealth}</span>
    <ProgressBar value={currentHealth} max={maxHealth} meter={getMeterColor()} />    
</div>

