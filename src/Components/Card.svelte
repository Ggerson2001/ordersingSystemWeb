<script>
  export let data = [];
  import { link } from 'svelte-spa-router'

</script>

{#each data as item}
  <div
    class="flex flex-col max-w-md  bg-white rounded-xl shadow-md overflow-hidden sm:w-96 "
  >
    <a
      href="/companies/{item.id}" use:link
      class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            src={item.imageLink}
            class="h-48 w-full object-cover md:h-full md:w-48"
            alt="company" />
        </div>
        <div class="pl-6 py-4">
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {item.name}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.type}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.location}
            </p>
          </div>
        </div>
      </div>
    </a>
  </div>
{/each}

<style>
</style>
