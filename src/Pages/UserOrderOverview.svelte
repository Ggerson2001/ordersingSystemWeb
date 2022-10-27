<script>
  import { onMount } from "svelte";
  import { t } from "../stores/i18n";
  import UserOrderLine from "../Components/UserOrderLine.svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import tokenStore from "../stores/token";
  let userOrders = [];
  export let params;

  onMount(async () => {
    getUserOrders();
  });


  //Getting all user orders based on user id
  export async function getUserOrders() {
    const resp = await fetch(
      `${$hostName}/userOrders/` + params.id
      , {
       
           
       headers: {
      
           'Authorization':window.sessionStorage?.token,
           
           
       },
  
   } );

    if (resp.ok) {
      userOrders = await resp.json();
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }
</script>

<div class="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
  <div
    class="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8"
  >
    <div
      class="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full"
    >
      <h3
        class="text-3xl xl:text-4xl dark:text-white font-semibold leading-7 xl:leading-9 w-full md:text-left text-gray-800"
      >
        {$t("dashboard.orderSum")}
      </h3>

      <div
        class="flex justify-center items-center w-full mt-8 flex-col space-y-4"
      >
        <UserOrderLine data={userOrders} />
      </div>
      <div
        class="flex flex-col flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full"
      >
        <div
          class="flex justify-start items-start flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full"
        >
          <!-- <div class="flex justify-between items-center w-full">
                        <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                        <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">$36.00</p>
                    </div> -->
        </div>
      </div>
    </div>
  </div>
</div>
