<script>

  import { link } from 'svelte-spa-router'
  import OrderItems from "../Components/paymentSummaryOrder.svelte";
  import { hostName } from "../stores/store.js";
  import { onMount } from "svelte";
  import { t } from "../stores/i18n";
  let orderItems=[]
  export let params;
  
  import { firstName, lastName, userType } from "../stores/store.js";



  onMount(async () => {
 
    setTimeout(() => {
      getOrderItems();
      getOrderInfo();
    }, 300);

  
 


});


  let total_amount;
  let date;


    //Getting order items for the last order made by the user
    export async function getOrderItems() {
      // console.log('getting order items')
    const resp = await fetch(
      `${$hostName}/cartItems/` + params.id
      , {
       
           
            headers: {
                'Content-Type': 'application/json',
                'Authorization':window.sessionStorage?.token,
                'Access-Control-Allow-Origin':'*' 
                
            },
       
        });

    if (resp.ok) {
      orderItems= await resp.json();

      console.log(orderItems)
      // console.log('response ok')
    } else if (resp.data === "") {
      throw new Error("Could not find any order item");
    }
  }

  let info;

  //Getting other order information
  export async function getOrderInfo() {
     
    const resp = await fetch(
      `${$hostName}/singleOrder/` + params.id
      , {
       
           
            headers: {
               
                'Authorization':window.sessionStorage?.token,
            
                
            },
       
        });

    if (resp.ok) {
      info=await resp.json();
      total_amount=info[0].total_amount;
      date=info[0].order_date;

      
    } else if (resp.data === "") {
      throw new Error("Could not find any order item");
    }
  }

</script>


<div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
  <div class="flex justify-start item-start space-y-2 flex-col">
      <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">{$t("home.orderComp")} </h1>
      <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> {$t("home.date")}: {date}</p>
  </div> 
  <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
      <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800"> {$t("home.customCart")}</p>

              
  

              <OrderItems data={orderItems} />
          
          </div>
          <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800"> {$t("home.summary")}</h3>
                  <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                 
             
                  </div>
                  <div class="flex justify-between items-center w-full">
                      <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">{$t("dashboard.total")}</p>
                      <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">€{total_amount}</p>
                  </div>
              </div>

          </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">{$t("home.customer")}</h3>
          <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div class="flex flex-col justify-start items-start flex-shrink-0">
                  <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                      <div class="flex justify-start items-start flex-col space-y-2">
                          <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{$firstName} {$lastName}</p>
                         
                      </div>
                  </div>

                  <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <img class="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email">
                      <img class="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email">
                     
                  </div>
              </div>
   
          </div>
      </div>
  </div>
</div>



<style>

</style>
