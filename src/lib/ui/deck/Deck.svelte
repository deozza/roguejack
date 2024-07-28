<script lang="ts">
	export let deckSize: number;
	export let mini: boolean = false;
</script>

<div
	class="flex flex-col items-center justify-center rounded-xl card-hover bg-gradient-to-br from-primary-900 to-tertiary-900 {mini ? 'h-16 w-12' : 'h-32 w-24'}"
>
	<span class="{mini ? 'p' : 'h4'} font-semibold">
		{deckSize}
	</span>
</div>
