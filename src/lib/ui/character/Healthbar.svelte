<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton";

    export let currentHealth: number;
    export let maxHealth: number;
    export let healthColor: string;

    

</script>

<div class="flex flex-col items-center justify-center w-full">
    <span class="text-2xl">{currentHealth}/{maxHealth}</span>
    <ProgressBar value={currentHealth} max={maxHealth} meter={healthColor} />    
</div>

