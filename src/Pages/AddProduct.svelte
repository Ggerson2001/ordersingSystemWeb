<script>
  import SideBar from "../Components/SideBar.svelte";
  import { v4 as uuidv4 } from "uuid";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";
  import {products} from "../stores/store";
	import { link } from 'svelte-spa-router'
  import {productImage} from "../stores/store";

  export let params;

  let nameInput = "";
  let priceInput = "";
  let ingredientsInput = "";

  //Adding new product to the system
  async function addProduct() {
    const newProduct = await fetch(
      `${$hostName}/products/company/` + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':window.sessionStorage?.token,
          'Access-Control-Allow-Origin':'*' 
        },
        body: JSON.stringify({
          id: uuidv4(),
          comp_id: params.id,
          name: nameInput,
          unit_price: priceInput,
          ingredients: ingredientsInput,
          productImage:$productImage
        }),
      }
    ).then((response) => response.json())
    .then(history.back())
    $products.push(newProduct)
  }
</script>
<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2">Dashboard</h3>
<div class="flex flex-row mt-4">
  <SideBar />

  <div class="w-4/5">
    <div class="flex flex-col">
      <div class="py-2 -my-2 overflow-x-auto lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-m font-medium leading-4 tracking-wider text-left text-black-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.newProduct")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                />
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                />
                <th
                  class="px-6 py-3 text-m font-medium leading-4 tracking-wider text-left text-black-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>

            <div class="flex flex-row ">
              <form on:submit|preventDefault|stopPropagation={addProduct}>
              <div class="container mx-auto px-6 py-6 ">
                <div class="w-full max-w-lg">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full  px-3 mb-6 md:mb-0">
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
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full  px-3 mb-6 md:mb-0">
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
                        placeholder="Price"
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
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
                        placeholder="Type"
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
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
                    
                        bind:value={$productImage}
                        placeholder="Type"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <button
                        class="w-60 px-4 py-2 text-white bg-green-500 rounded shadow-xl "
                        type="submit"
                      >
                        {$t("dashboard.add")}
                      </button>
                  </div>
                </div>
              </div>
              </form>
            
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
