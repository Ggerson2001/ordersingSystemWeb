<script>
  import { createEventDispatcher } from "svelte";
  export let cartItems;
  import axios from "axios";
  import tokenStore from "../stores/token";
  import { link } from "svelte-spa-router";

  import {
    firstName,
    lastName,
    listId,
    userId,
    profileImage,
  } from "../stores/store.js";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";
  import { v4 as uuidv4 } from "uuid";

  let orderId = uuidv4();
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatToday = dd + "-" + mm + "-" + yyyy;
  const dispatch = createEventDispatcher();

  //Calculate the total amount of prices in the cart
  $: cartTotal = cartItems.reduce((sum, curValue) => {
    return sum + curValue.unit_price * curValue.quantity;
  }, 0);

  //Remove certain items from cart
  function removeItem(id) {
    cartItems = cartItems.filter(function (item) {
      return item.id !== id;
    });
  }

  function pushOrder() {
    addOrder();
  }


  //Add the order made by the user
  async function addOrder() {
    try {
      const newOrder = await fetch(`${$hostName}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: window.sessionStorage?.token,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: orderId,
          user_id: $userId,
          user_name: $firstName + " " + $lastName,
          order_date: formatToday,
          total_amount: cartTotal,
          list_id: $listId,
          
        }),
      });

      addOrderItem();
    } catch (e) {
      console.log(e);
    }
  }

  // Add the cart items in one certain order
  async function addOrderItem() {
    await fetch(`${$hostName}/orderItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage?.token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        cartItems: cartItems,
      }),
    });
  }
</script>

<div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl   ">
  <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6 ">
    <div class="flex items-start justify-between">
      <h2 class="text-lg font-medium text-gray-900">
        {$t("dashboard.shopCart")}
      </h2>
      <div class="ml-3 flex h-7 items-center" />
    </div>

    <div class="mt-8">
      <div class="flow-root">
        <ul class="-my-6 divide-y divide-gray-200">
          {#each cartItems as item}
            <li class="flex py-6">
              <div
                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
              >
                <img
                  src={item.productImage}
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  class="h-full w-full object-cover object-center"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div
                    class="flex justify-between text-base font-medium text-gray-900"
                  >
                    <h3>{item.name}</h3>
                    <p class="ml-4">€ {item.unit_price}</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    {item.ingredients}
                  </p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                  <input type="number" id="price" bind:value={item.quantity} />
                  <!-- <InputNum bind:value={item.quantity}/> -->

                  <button
                    type="button"
                    on:click={removeItem(item.id)}
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          {/each}
          <!-- More products... -->
        </ul>
      </div>
    </div>
  </div>

  <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
    <div class="flex justify-between text-base font-medium text-gray-900">
      <p>{$t("dashboard.total")}</p>
      <p>€{cartTotal}</p>
    </div>

    <div class="mt-6">
      <a href="/paymentSuccesfull/{orderId}" use:link
        ><button
          on:click={pushOrder}
          class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-40 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          {$t("dashboard.checkOut")}
        </button></a
      >
    </div>
    <div class="mt-6 flex justify-center text-center text-sm text-gray-500" />
  </div>
</div>

<style>
</style>
