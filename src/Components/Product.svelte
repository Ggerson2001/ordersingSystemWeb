<script>
  import Modal from "./Modal.svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "../stores/i18n";

  export let data = [];

  const dispatch = createEventDispatcher();

  function addToCart(id) {
    dispatch("addcart", id);
   
  }

  let showModal = false;


</script>

{#each data as item}


   
  <div class="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl w-64">
    <div class="prod-title">
      <p class="text-2xl uppercase text-gray-900 font-bold"> {item.name}</p>
      <p class="uppercase text-sm text-gray-400">
        {item.ingredients}
      </p>
    </div>
  

    <div class="image h-25  " style="background-image: url({item.productImage});">
    
    </div>
    <br>
    <div class="prod-info grid gap-10">
      
      <div class="flex flex-col md:flex-row justify-between items-center text-gray-900">
        <p class="font-bold text-xl">  {$t("dashboard.price")}: {item.unit_price} €</p>
        
      </div>
      <button   on:click={addToCart(item.id)}
                class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">  {$t("dashboard.addCart")}</button>
    </div>
  </div>


{/each}


<style>
  .image{

    height: 150px;
    
     background-size: cover;
     background-position: center;
 
  }
</style>