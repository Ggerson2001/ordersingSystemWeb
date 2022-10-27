<script>
    import { createEventDispatcher, onMount } from "svelte";
    export let open = true;
    const dispatch = createEventDispatcher();
  
    function toggle() {
      open = !open;
      dispatch("update");
     
    }
  </script>
  
  {#if !open}
    <button
    class="block w-full md:w-auto text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 "
      on:click={() => toggle()}
    >
      Open
    </button>
  {/if}
  {#if open}
    <button
    class="block w-full md:w-auto text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 "
      on:click={() => toggle()}
    >
      Close
    </button>
  {/if}
  