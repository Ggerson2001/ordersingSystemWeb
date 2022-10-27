<script>
  import OrderLine from "../Components/OrderLine.svelte";
  import SideBar from "../Components/SideBar.svelte";
  import { onMount } from "svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import TotalLine from "../Components/totalLine.svelte";
  import tokenStore from "../stores/token";
  import { t } from "../stores/i18n";

  let ordersTotal = [];
  let filteredOrders = [];
  export let params;

  let listName;
  let list_name = "";

  onMount(async () => {
    getTotalOrders();
    getListName();
  });


  //Getting orders grouped by products name
  export async function getTotalOrders() {
    const resp = await fetch(
      `${$hostName}/ordersTotal/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   } );

    if (resp.ok) {
      ordersTotal = await resp.json();
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }

  //Getting the name of list 
  async function getListName() {
    const resp = await fetch(
      `${$hostName}/openListName/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   } );

    if (resp.ok) {
      listName = await resp.json();
      list_name = listName[0].list_name;
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }

  $: cartTotal = ordersTotal.reduce((sum, curValue) => {
    return sum + curValue.product_price * curValue.total;
  }, 0);
</script>

<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2 ">Dashboard</h3>

<div class="flex flex-row mt-4">

  <div class="sidebar">
    <SideBar  />
  </div>


  <div class="w-4/5 h-96">
    <div class="flex flex-col">
      <div class="py-2 -my-2 overflow-x-auto lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            
              <thead>
                <tr>
                  <th />

                  <h2 class="text-3xl font-small text-blue-600 px-6 ">{list_name}</h2>
                  <th />
                  
                </tr>
              </thead>

              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    {$t("dashboard.productName")}
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Unit_price
                  </th>

                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    {$t("dashboard.totalAmountOrdered")}
                  </th>

                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Sub Total
                  </th>
                </tr>
                </thead
              >

              <TotalLine data={ordersTotal} />
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  />
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  />
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  />
                  <th
                    class="px-6 py-3 text-m font-medium leading-4 tracking-wider text-left text-black-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    {$t("dashboard.total")}: {cartTotal}€
                  </th>
                </tr>
              </thead>
          
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  h2 {
    text-align: center;
  }

  @media print {
   h3 {
      visibility: hidden;
   }

   .sidebar{
    display: none;
   }
}


 
</style>
