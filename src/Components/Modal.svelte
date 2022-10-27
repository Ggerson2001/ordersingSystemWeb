<script>
  import { createEventDispatcher } from "svelte";
  import { t } from "../stores/i18n";
  import { firstName, lastName, listId, userId } from "../stores/store.js";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { v4 as uuidv4 } from "uuid";
	import { link } from 'svelte-spa-router'


  let orderId=uuidv4();
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatToday = dd + "-" + mm + "-" + yyyy;


  export let cartItems;
  const dispatch = createEventDispatcher();
  export let open = false;


  //Total amount of prices in the cart 
  $: cartTotal = cartItems.reduce((sum, curValue) => {
    return sum + curValue.unit_price * curValue.quantity;
  }, 0);

  //Removing items form cart
  function removeItem(id) {
    cartItems = cartItems.filter(function (item) {
      return item.id !== id;
    });
  }

  function pushOrder() {
    addOrder();
  
  }

 
  //Mobile screen adding order
  async function addOrder() {
    try {
      const newOrder = await fetch(
        `${$hostName}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Authorization':window.sessionStorage?.token,
            'Access-Control-Allow-Origin':'*' 
          },
          body: JSON.stringify({
            id: orderId,
            user_id: $userId,
            user_name: $firstName + " " + $lastName,
            order_date: formatToday,
            total_amount: cartTotal,
            list_id: $listId,
          }),
        }
      );
      // console.log(newOrder)

      addOrderItem();
    } catch (e) {
      console.log(e);
    }
  }

 
//Mobile screen adding order items to a certain order
  async function addOrderItem() {
    // console.log(cartItems);

    await fetch(`${$hostName}/orderItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':window.sessionStorage?.token,
        'Access-Control-Allow-Origin':'*' 
      },
      body: JSON.stringify({
        cartItems: cartItems,
      }),
    });
  }



  
</script>

{#if open}
  <div
    class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-4 lg:p-0"
  >
    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
    <div
      class="bg-white w-full lg:h-max lg:w-1/3  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
    >
      <div
        class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold"
      >
        Cart
        <button
          class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
          on:click={() => dispatch("close")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            /></svg
          >
        </button>
      </div>
      
      
        
        
      <div class="content p-8 overflow-y-scroll">
        <div class="mt-2 ">
         




{#each cartItems as item }
<div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
  <div class="flex w-2/5">
    <!-- product -->
    <!-- <div class="w-20">
      <img class="h-24"  src="https://thumbs.dreamstime.com/b/perfect-hamburger-classic-burger-american-cheeseburger-isolated-white-reflection-giant-large-massive-thick-extra-toppings-59054909.jpg" alt="">
    </div> -->
    <div class="flex flex-col justify-between ml-4 flex-grow">
      <span class="font-bold text-sm">{item.name}</span>
      <span class="text-red-500 text-xs">{item.ingredients}</span>
      <button  on:click={removeItem(item.id)} class="font-semibold hover:text-red-500 text-gray-500 text-xs">      <svg
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
      </svg></button>
    </div>
  </div>
  <div class="flex justify-center w-2/5">
  

    <input class="mx-2 border text-center w-8" type="number" bind:value={item.quantity}>

  
  </div>
  <span class="text-center w-1/5 font-semibold text-sm">${item.unit_price}</span>
 
</div>
  
{/each}


 





 

          
        </div>

      
      </div>
 
       







   
     
      <div class="border-t border-gray-200 py-6 px-4 ">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>{$t("dashboard.total")}</p>
          <p>${cartTotal}</p>
        </div>
    
        <div class="mt-6">
    
    
          <a href="/paymentSuccesfull/{orderId}" use:link
            ><button
              on:click={pushOrder}
       
              class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
              {$t("dashboard.checkOut")}
            </button></a
          >
        </div>
        <div class="mt-6 flex justify-center text-center text-sm text-gray-500" />
      </div>
    </div>
  </div>
{/if}
 