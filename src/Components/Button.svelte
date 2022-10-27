<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let loggedIn = true;
  import { beforeUpdate, afterUpdate } from 'svelte';
  const dispatch = createEventDispatcher();

  // afterUpdate(() => {
	// 	loggedIn
	// });
  
</script>

{#if loggedIn}
<span
  class="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
  
>
  Opened
</span>
{/if}
{#if !loggedIn}
<span
class="bg-red-500 text-white font-bold py-2 px-4 rounded-full"

>
  Closed
</span>
{/if}

