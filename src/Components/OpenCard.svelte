<script>
  import { createEventDispatcher } from "svelte";
  import { date } from "../stores/store.js";
  import Hidden from "../Components/Hidden.svelte";
  import { link } from 'svelte-spa-router'
  import { t } from "../stores/i18n";
 
  import { tweened } from 'svelte/motion';
  let original = 60 * 60; // TYPE NUMBER OF SECONDS HERE
	let timer = tweened(original)

  setInterval(() => {
    if ($timer > 0) $timer--;
  }, 1000);

  $: minutes = Math.floor($timer / 60);
  $: minname = minutes > 1 ? "mins" : "min";
  $: seconds = Math.floor($timer - minutes * 60)


  export let data = [];
 
  



  


</script>

{#each data as item}
 
<a
href="/openList/{item.id}" use:link

>
<div
    class="flex flex-col bg-white rounded-lg shadow-2xl w-full m-6 overflow-hidden sm:w-52 hello hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
  <div class="image h-30 m-6" >
    
  </div>
   
    <h2 class="text-center px-2 pb-5 text-xl font-medium text-gray-900">
      {item.list_name}
    </h2>
    <h3 class="text-center px-2 pb-5">{$t("home.date")}: {item.date}</h3>
   
   

 
      <!-- <button>{$t("home.checkList")}</button> -->
     
  </div>
</a>
{/each}

<style>


  .image{
    background-image:url("https://s3.amazonaws.com/thumbnails.venngage.com/template/9f596769-790d-4b5f-bb80-668016a9c920.png") ;
    height: 200px;
    width: 80%;
     background-size: cover;
     background-position: center;
 
  }
</style>
