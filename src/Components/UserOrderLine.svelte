<script>
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";
  export let data = [];
  import { onMount } from "svelte";
  import tokenStore from "../stores/token";

  onMount( () => {
   formatDate()
  });
  let date;


  
function formatDate() {
    const now = new Date();
    const dateObject = {
        month: now.getMonth() + 1,
        day: now.getDate(),
        year: now.getFullYear()
    }
    if (dateObject.month.toString().length < 2) dateObject.month = "0" + dateObject.month;
    if (dateObject.day.toString().length < 2) dateObject.day = "0" + dateObject.day;
   date = [dateObject.day, dateObject.month, dateObject.year].join("-");
}


  export async function getOrderItems(id) {
    const resp = await fetch(
      `${$hostName}/cartItems/` + id
      , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':window.sessionStorage?.token,
                'Access-Control-Allow-Origin':'*' 
                
            },
       
        });

    if (resp.ok) {
      return await resp.json();
      
    } else if (resp.data === "") {
      throw new Error("Could not find any order item");
    }
  }
</script>

{#each data as item}
  <div class="flex justify-center items-center w-full mt-8 flex-col space-y-4">
    <div
      class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full"
    >
      <div class="-m-px w-40 md:w-32">
        <img
          class="hidden md:block object-contain h-32 "
          src="https://www.myfoodorder.eu/assets/logos/myfoodorder.png"
          alt="girl-in-red-dress"
        />
      </div>
      <div
        class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8"
      >
        <div class="flex flex-col md:flex-shrink-0 justify-start items-start">
          <h3
            class="text-lg md:text-xl dark:text-white w-full font-semibold leading-6 md:leading-5 text-gray-800"
          >
            {$t("home.date")}: {item.order_date}
            {#if item.order_date==date}
              ({$t("dashboard.today")})
            {/if}
          </h3>
          <div
            class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4"
          >
            <p class="text-sm leading-none dark:text-gray-300 text-gray-600">
              {$t("dashboard.products")}:
              {#await getOrderItems(item.id)}
                <p>Loading order items ...</p>
              {:then products}
                {#each products as product}
                  <dl>
                    <dt>{product.quantity} x {product.product_name}</dt>
                  </dl>
                {/each}
              {:catch error}
                <h1>Something went wrong</h1>
                <p>{error.message}</p>
              {/await}
            </p>
          </div>
        </div>
        <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
          <p
            class="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800"
          >
            {$t("dashboard.total")}:{item.total_amount}€
          </p>
        </div>
      </div>
    </div>
  </div>
{/each}
