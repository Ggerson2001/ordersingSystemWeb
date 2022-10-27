<script>
  export let data = [];


  function getSubtotal(item) {
    return item.product_price * item.quantity;
  }
  
</script>
{#each data as item}
<div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
    <div class="pb-4 md:pb-8 w-full md:w-40">
        <img class="w-full hidden md:block" src="https://bakeitwithlove.com/wp-content/uploads/2021/07/cajun-fries-sq.jpg" alt="img" />
      
    </div>
    <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
        <div class="w-full flex flex-col justify-start items-start space-y-8">
            <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.product_name}</h3>
            <div class="flex justify-start items-start flex-col space-y-2">
            
                <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Size: </span> Medium</p>
                <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Taste: </span> Delicious</p>
            </div>
        </div>
        <div class="flex justify-between space-x-8 items-start w-full">
            <p class="text-base dark:text-white xl:text-lg leading-6">Price:  {item.product_price}€ </p>
            <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Quantity:  {item.quantity}</p>
            <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">€{getSubtotal(item)}</p>
        </div>
    </div>
</div>
{/each}