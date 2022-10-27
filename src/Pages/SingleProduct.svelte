<script>
  import SideBar from "../Components/SideBar.svelte";
  import ProductSquar from "../Components/ProductSquar.svelte";
  import { onMount } from "svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";
  import tokenStore from "../stores/token";
  export let params;
	import { link } from 'svelte-spa-router'
  import {productImage} from "../stores/store";

  let prodName;
  let price;
  let prodIngredients;
  let prodImage;
 


  let compInfo;

  onMount(async () => {
    getProdInfo();
  });

  let nameInput = "";
  let priceInput = "";
  let ingredientsInput = "";
  let imgInput;


  //Updating a certain product based on id
  const updateProduct = async () => {
  
    const response = await fetch(
      `${$hostName}/products/` + params.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization':window.sessionStorage?.token,
          'Access-Control-Allow-Origin':'*' 
        },
        body: JSON.stringify({
          name: nameInput,
          unit_price: priceInput,
          ingredients: ingredientsInput,
          productImage:imgInput
        }),
      }
    ).then((response) => response.json())
    .then(history.back())

   
  };


  //Getting product information
  async function getProdInfo() {
    const resp = await fetch(
      `${$hostName}/prodInfo/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   } );

    if (resp.ok) {
      compInfo = await resp.json();
      prodName = compInfo[0].name;
      price = compInfo[0].unit_price;
      prodIngredients = compInfo[0].ingredients;
      prodImage=compInfo[0].productImage;
      // $productImage=compInfo[0].productImage;
      
      
      nameInput = prodName;
      priceInput = price;
      ingredientsInput = prodIngredients;
      imgInput=prodImage;
      console.log(compInfo)

    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }
</script>

<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2">Dashboard</h3>

<div class="flex flex-row mt-4">
  <SideBar />

  <div class="w-4/5">
    <div class="flex flex-col grid grid-cols-1 divide-y">
      <div class="py-2 -my-2 overflow-x-auto lg:px-8 grid grid-cols-1 divide-y">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg "
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.edit")} Product
                </th>
              </tr></thead
            >
            <div class="container mx-auto px-6 py-6 ">
              <form on:submit|preventDefault|stopPropagation={updateProduct}>
              <div class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      {$t("dashboard.productName")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      pattern="[a-zA-Z0-9\s]+"
                      bind:value={nameInput}
                      placeholder={prodName}
                    />
                  </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      {$t("dashboard.price")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="number"
                      step="any"
                      bind:value={priceInput}
                      placeholder={price}
                    />
                  </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      {$t("dashboard.ingredients")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      
                      bind:value={ingredientsInput}
                      placeholder={prodIngredients}
                    />
                  </div>
                </div>


                
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                    {$t("dashboard.linkOfImage")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                   
                      bind:value={imgInput}
                      placeholder={prodImage}
                    />
                  </div>
                </div>

                <button
                    type="submit"
                    class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                  
                  >
                    {$t("dashboard.update")}
                  </button>
              </div>
              </form>
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
