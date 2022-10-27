<script>
  import OrderItems from "../Components/OrderItems.svelte";
  import { onMount } from "svelte";
  import tokenStore from "../stores/token";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { afterUpdate } from "svelte";
  import router from "page";
  import Button from "../Components/Button.svelte";
  import Button1 from "../Components/Button1.svelte";
  import { t } from "../stores/i18n";
	import { link } from 'svelte-spa-router'
  import {push, pop, replace} from 'svelte-spa-router'
  let firstName = "";
  let lastName = "";
  let username = "";

  export let isOpened = true;

  const today = new Date();

  export let data = [];
  let child;


  



  
  /*
  Opening/Closing a certain list 
  Checks if the list is opened or closed 
  Boolean opened is represented with 1 in the database as a boolean type
  Boolean closed is represented with 0 in the database as a boolean type


  */
  const openList = async (id,name, opened) => {
    if (opened == 1) {
      isOpened = true;
      var x = confirm("Are you sure you want to close the list?");
      if (x) {
      
        const response = await fetch(
          `${$hostName}/openTheList/` + id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              'Authorization':window.sessionStorage?.token
            },
            body: JSON.stringify({
              opened: 0,
            }),
          }
        );
      
      alert(name+" is closed")
      } else {
        return null;
      }
     
    } else if (opened != 1) {
      isOpened = false;
      var y = confirm("Are you sure you want to open the list?");
      if (y) {

        const response = await fetch(
          `${$hostName}/openTheList/` + id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              'Authorization':window.sessionStorage?.token,
              'Access-Control-Allow-Origin':'*' 
            },
            body: JSON.stringify({
              opened: 1,
            }),
          }
        );
        alert(name+" is opened")
      } else {
        return null;
      }
     
    }

   
  };


</script>

{#each data as item}
  <tbody class="bg-white">
    <tr v-for="(u, index) in users" :key="index">
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 w-10 h-10">
            <img
              class="w-10 h-10 rounded-full"
              src="https://www.how-to-draw-funny-cartoons.com/images/cartoon-list-007.jpg"
              alt=""
            />
          </div>

          <div class="ml-4">
            <div class="text-sm font-medium leading-5 text-gray-900">
              {item.list_name}
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <Button {item} loggedIn={item.opened}  />
      </td>
     

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        {item.date}
      </td>

      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <a href="/orders/{item.id}" use:link>
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 "
          >
            {$t("dashboard.viewOrders")}</button
          >
        </a>
      </td>
      <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
        <Button1 {item} open={item.opened} on:update={openList(item.id,item.list_name, item.opened)} />
      </td>
    </tr>
  </tbody>
{/each}
