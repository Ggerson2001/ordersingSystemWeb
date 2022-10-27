<script>
  import { hostName, BACKEND_PORT } from "../stores/store.js";

  export let data = [];

  function getSubtotal(item) {
    return item.product_price * item.total;
  }
</script>

{#each data as item}
  <tbody class="bg-white">
    <tr v-for="(u, index) in users" :key="index">
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <div class="text-sm font-medium leading-5 text-gray-900">
          {item.product_name}
        </div></td
      >

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        {item.product_price} €
      </td>

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        {item.total}
      </td>

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        {getSubtotal(item)} €
      </td>
    </tr>
  </tbody>
{/each}
