<script>
    export let shown = true;
</script>

<svelte:options accessors={true}/>

{#if shown}
    <slot/>
{/if}