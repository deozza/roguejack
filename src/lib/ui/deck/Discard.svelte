<script lang="ts">
	export let discardSize: number;
	export let mini: boolean = false;
</script>

<div
	class="flex flex-col items-center justify-center rounded-xl card-hover p-2 bg-gradient-to-br from-gray-500 to-gray-800 {mini
		? 'h-16 w-12'
		: 'h-32 w-24'}"
>
	<span class="{mini ? 'p' : 'h4'} font-semibold">
		{discardSize}
	</span>
</div>
