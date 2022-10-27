<script>
  import OrderItems from "../Components/OrderItems.svelte";
  import { onMount } from "svelte";
  import tokenStore from "../stores/token";

  import { hostName, BACKEND_PORT } from "../stores/store.js";

  let username = "";

  const today = new Date();

  export let data = [];

 
  //Getting the order items for each order 
  export async function getOrderItems(id) {
    const resp = await fetch(
      `${$hostName}/cartItems/` + id
    ,{
        
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
  <tbody class="bg-white">
    <tr v-for="(u, index) in users" :key="index">
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 w-10 h-10">
            <img
              class="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>

          <div class="ml-4">
            <div class="text-sm font-medium leading-5 text-gray-900">
              {item.user_name}
            </div>
            <div class="text-sm leading-5 text-gray-500" />
          </div>
        </div>
      </td>
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <div class="text-sm leading-5 text-gray-900">
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
        </div>
      </td>

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        {item.order_date}
      </td>

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        {item.total_amount} €
      </td>
    </tr>
  </tbody>
{/each}
