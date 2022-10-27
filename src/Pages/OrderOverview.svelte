<script>
  import OrderLine from "../Components/OrderLine.svelte";
  import SideBar from "../Components/SideBar.svelte";
  import { onMount } from "svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import tokenStore from "../stores/token";
  import { t } from "../stores/i18n";
	import { link } from 'svelte-spa-router'
  let orders = [];
  let filteredOrders = [];
  export let params;

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatToday = dd + "-" + mm + "-" + yyyy;

  let listName;
  let list_name = "";
  let date = "";

  $: cartTotal = orders.reduce((sum, curValue) => {
    return sum + curValue.total_amount;
  }, 0);

  let inputName = "";
  let locationInput = "";

  onMount(async () => {
    getOrders();
    getListName();
  });


  //Getting  order with a certain id
  export async function getOrders() {
    const resp = await fetch(
      `${$hostName}/orders/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   });

    if (resp.ok) {
      orders = await resp.json();
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }

  //Getting the list name and storing it in svelte store
  export async function getListName() {
    const resp = await fetch(
      `${$hostName}/openListName/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   });

    if (resp.ok) {
      listName = await resp.json();
      list_name = listName[0].list_name;
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }
</script>

<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2 ">Dashboard</h3>

<div class="flex flex-row mt-4">
  <SideBar />

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

                <h2 class="text-3xl font-small text-blue-600  ">{list_name}</h2>
                <th />
             
                <th
                  ><a href="/ordersTotal/{params.id}" use:link
                    ><button
                      class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  "
                      >   {$t("dashboard.ordersGrouped")}</button
                    ></a
                  ></th
                >
              </tr>
            </thead>

            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.user")}
                  
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.orderDescription")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.orderDate")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.total")}
                </th>
             
              </tr>
            </thead>

            <OrderLine data={orders} />
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
</style>
