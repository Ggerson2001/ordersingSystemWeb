<script>
  import Product from "../Components/Product.svelte";
  import Cart from "../Components/Cart.svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { onMount } from "svelte";
  import Modal from "../Components/Modal.svelte";
  import { createEventDispatcher } from "svelte";
  import {products} from "../stores/store";

  let cartItems = [];

  export let params;

  const dispatch = createEventDispatcher();




let showModal = false;
const handleToggleModal = () => {
  showModal = !showModal;
};


  //Selecting products and adding them to the cart
  function addToCart(event) {
    const selectedProdId = event.detail;
    const isAlreadyInCart = cartItems.findIndex(
      (prod) => prod.id === selectedProdId
    );
    if (isAlreadyInCart > -1) {
      cartItems[isAlreadyInCart].quantity += 1;
    } else {
      cartItems = [
        ...cartItems,
        { ...$products.find((prod) => prod.id === selectedProdId), quantity: 1 },
      ];
    }
  }

  onMount(async () => {
    getProducts();
  });


  //Getting all the products registed in a certain company
  export async function getProducts() {
    const resp = await fetch(
      `${$hostName}/products/company/` + params.id,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': window.sessionStorage?.token,
          'Access-Control-Allow-Origin':'*' 
        },
      }
    );

    if (resp.ok) {
      $products = await resp.json();
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }

  //Getting one company 
  export async function getCompany(id) {
    const resp = await fetch(
      `${$hostName}/companies/` + id,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': window.sessionStorage?.token,
          'Access-Control-Allow-Origin':'*' 
        },
      }
    );

    if (resp.ok) {
      return await resp.json();
     
    } else {
      throw new Error(await resp.text());
    }
  }
</script>

{#await getCompany(params.id)}
  <p>Loading company ...</p>
{:then companies}
  <div style="overflow: hidden; length:100%" >
    <div class="filter w-full  " style="  float: left;">
      <div
        class="_1PmIG"
        role="img"
        aria-label="Cafetaria Snack To Go"
        style="background: -webkit-image-set(url(&quot;https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_40:9,c_thumb,w_1440/f_auto/q_auto/dpr_1.0/v1645090532/static-takeaway-com/images/generic/heroes/541/541_burger_9&quot;) 1x, url(&quot;https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_40:9,c_thumb,w_1440/f_auto/q_auto/dpr_2.0/v1645090532/static-takeaway-com/images/generic/heroes/541/541_burger_9&quot;) 2x) center center / cover no-repeat; height: 112px;"
      />

      <div
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white name text-left"
        style="text-align: center;"
      >
     
        {#each companies as company}
          {company.name}
        {/each}
      </div>
        <button
        on:click={() => handleToggleModal()}
          class="block sm:hidden w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
      
          <svg class="flex-1 w-8 h-8 fill-current content-center" viewbox="0 0 24 24">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
            </svg>
        </button>

      <div class=" w-full p-6 " >
        <div class="flex flex-wrap gap-10">
          <Product on:addcart={addToCart} data={$products} />
        </div>
      </div>
    </div>

    <div class="" style="margin-left: 100px;">
      <div class="fixed ">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0  bg-opacity-75 transition-opacity" />

          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 mt-12"
          >
            <div class="pointer-events-auto w-screen max-w-md hidden md:block">
              <Cart bind:cartItems />

            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:catch error}
  <h1>Something went wrong</h1>
  <p>{error.message}</p>
{/await}


<Modal
      title="Customize your snack"
      open={showModal}
      bind:cartItems
      on:close={() => handleToggleModal()}
    >
      <svelte:fragment slot="body">
        This is content inside my modal! 👋
      </svelte:fragment>
    </Modal>

<style>

  .name{
    background-color: burlywood;
  }
</style>
