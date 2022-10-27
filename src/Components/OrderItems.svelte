<script>
  export let products = [];
</script>

{#each products as item}
  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
    {item.quantity} x {item.product_name}
  </td>
{/each}
