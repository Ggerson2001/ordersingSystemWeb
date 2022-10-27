<script>
  import { createEventDispatcher } from "svelte";
  export let data = [];
  import { t } from "../stores/i18n";

  const dispatch = createEventDispatcher();

  function addToList(id) {
    dispatch("addtoList", id);
  }
</script>

{#each data as item}
  <div
    class="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-l"
    >
    <div class="md:flex">
      <div class="md:shrink-0">
        <img
          class="h-48 w-full object-cover md:h-full md:w-48"
          src={item.imageLink}
          alt="Man looking at item at a store"
        />
      </div>
      <div class="pl-6 py-4">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
        >
          {item.name}
        </div>
     
        <p class="mt-2 text-slate-500">{item.type}</p>
        <p class="mt-2 text-slate-500">{item.location}</p>
        <p class="mt-2 text-slate-500">
          <button
            on:click={addToList(item.id)}
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {$t("dashboard.addToList")}
          </button>
        </p>
      </div>
    </div>
  </div>
{/each}

<style>
</style>
