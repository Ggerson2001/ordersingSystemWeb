<script>
  import Card from "../Components/Card.svelte";
  import { listId } from "../stores/store.js";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";


  import { onMount } from "svelte";

  let compList = [];
  export let params;

  onMount(async () => {
    getCompList();
  });

  $listId = params.id;


  //Getting all the companies that are stored in a certain opened list
  export async function getCompList() {
    const resp = await fetch(
      `${$hostName}/openListComp/` + params.id
      ,{
        
        headers: {
            'Content-Type': 'application/json',
           
            'Authorization':window.sessionStorage?.token,
            'Access-Control-Allow-Origin':'*' 
        },
   
    });

    if (resp.ok) {
      compList = await resp.json();
      console.log(compList)
     
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }


  //Getting the open list based on id
  export async function getList(id) {
    const resp = await fetch(`${$hostName}/openlist/` + id
      ,{
        
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*' ,
            'Authorization':window.sessionStorage?.token
        },
   
    });

    if (resp.ok) {
      return await resp.json();
    } else {
      throw new Error(await resp.text());
    }
  }
</script>

{#await getList(params.id)}
  <p>Loading List ...</p>
{:then lists}
  <div style=" overflow: hidden; length:100%">
    <div class="filter w-full" >
      <div
        class="_1PmIG"
        role="img"
        aria-label="Crispy Chicken"
        style="background: -webkit-image-set(url(&quot;https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_40:9,c_thumb,w_2040/f_auto/q_auto/dpr_1.0/v1649168875/static-takeaway-com/images/generic/heroes/541/541_burger_107&quot;) 1x, url(&quot;https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_40:9,c_thumb,w_2040/f_auto/q_auto/dpr_2.0/v1649168875/static-takeaway-com/images/generic/heroes/541/541_burger_107&quot;) 2x) center center / cover no-repeat; height: 200px;"
      />

      <div
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        style="text-align: center;"
      >
        {#each lists as list}
          <!-- {list.date} -->
          <h1>{$t("home.compList")}</h1>
        {/each}
      </div>

      <div class=" w-full  p-6">
        <div class="flex flex-wrap gap-6">
          <Card data={compList} />
        </div>
      </div>
    </div>
  </div>
{:catch error}
  <h1>Something went wrong</h1>
  <p>{error.message}</p>
{/await}

<style>
</style>
