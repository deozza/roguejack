<script lang="ts">
	export let deckSize: number;
</script>

<div
	class="flex flex-col items-center justify-center rounded-xl card-hover p-2 bg-gradient-to-br from-primary-900 to-tertiary-900 h-32 w-24"
>
	<span class="h4 font-semibold">
		{deckSize}
	</span>
</div>
