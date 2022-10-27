<script>
  import SideBar from "../Components/SideBar.svelte";
  import ListCard from "../Components/ListCard.svelte";
  import {onMount} from "svelte";
  import {v4 as uuidv4} from "uuid";
  import {date, hostName} from "../stores/store.js";
  import {push} from 'svelte-spa-router'
  import {t} from "../stores/i18n";
  let companies = [];
  let num = 0;
  let list_name = "";
  let num1 = 1;
  let listEmpty = true;
  let openList = [];
  let header = undefined


  onMount(() => {
      header = {'Authorization': window.sessionStorage?.token}
      formatDate();
      getCompanies();
      
  });


  //Formatting the date dd--mm-yy
  function formatDate() {
      const now = new Date();
      const dateObject = {
          month: now.getMonth() + 1,
          day: now.getDate(),
          year: now.getFullYear()
      }
      if (dateObject.month.toString().length < 2) dateObject.month = "0" + dateObject.month;
      if (dateObject.day.toString().length < 2) dateObject.day = "0" + dateObject.day;
      $date = [dateObject.day, dateObject.month, dateObject.year].join("-");
  }


  //Adding companies in the opening list form
  function addToList(event) {
      const selectedProdId = event.detail;
      const isAlreadyInList = openList.findIndex(
          (prod) => prod.id === selectedProdId
      );
      if (isAlreadyInList > -1) {
          //  openList[isAlreadyInList].quantity += 1;
      } else {
          openList = [
              ...openList,
              {...companies.find((prod) => prod.id === selectedProdId)},
          ];
      }
      listEmpty = false;
  }


  //Post request for addding companies to the new list that is going to be opened
  async function addCompToList() {
      await fetch(
          `${$hostName}/compToList`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  'Authorization': window.sessionStorage?.token,
                  'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                  // list_id: id,
                  openList: openList,
              }),
          }
      )
  }

  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let currentdate = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let currentmonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let currentyear = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  // prints date in YYYY-MM-DD format
  let time = currentyear + "-" + currentmonth + "-" + currentdate + " " + hours + ":" + minutes + ":" + seconds;
  let time1 = currentyear + "-" + currentmonth + "-" + currentdate + " " + (date_ob.getHours() + 1) + ":" + minutes + ":" + seconds;
  let d = new Date(date_ob.setHours(date_ob.getHours() + 1));


  let date_time = currentdate + "-" + currentmonth + "-" + currentyear ;
  //Open a list for the first time
  export async function openListComp() {
      if (listEmpty) {
       
          alert("Please add companies to the list");
      } else if (!listEmpty) {
       
          try {
              await fetch(
                  `${$hostName}/openList`,
                  {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                          'Authorization': window.sessionStorage?.token,
                          'Access-Control-Allow-Origin': '*'
                      },
                      body: JSON.stringify({
                          id: uuidv4(),
                          date: $date,
                          list_name: list_name,
                          opened: 1,
                          open_time: time,
                          close_time: time1
                      }),
                  }
              );
          
              await addCompToList();
              alert(list_name + " is opened")
              await push("/home");
          } catch (e) {
              console.log(e);
          }
          // router.redirect("/home");
      }
  }



 // Sending microsoft notification in teams channel after the list is opened
  export async function sendMicrosoftTeamsMessages() {
    const url= "https://parantion.webhook.office.com/webhookb2/aa20a9c8-091f-4043-a586-7bd60dc42521@8e6513bc-2b88-4914-9756-a9b2c9bf8f4b/IncomingWebhook/fa1bbd159bc043288da0c9b18348906e/878afd4e-0880-4b0f-9535-0b5c15a488d0";
    try {
      const newMessage = await fetch(url, {
        method: "POST",
        mode:'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      "summary": "Issue 176715375",
      "themeColor": "0078D7",
      "title": `${list_name} is open`,
      "sections": [
          {
              "activityTitle": `List date:${date_time}`,
              "text": "Please ,place your order before 11:00 AM"
          }
        
      ],	"potentialAction": [

	
		
{
    "@type": "OpenUri",
    "name": "Go to Snackion 2.0",
    "targets": [
        {
            "os": "default",
            "uri": "https://projecten.parantion.nl/snackion2/"
        }
    ]
}
]
        }),
      });
      return null;
    } catch (e) {
      console.log(e);
    }
  }


  function showList() {
  
   openListComp();
  sendMicrosoftTeamsMessages();
  }


  


    //Get all companies
  export async function getCompanies() {
      await fetch(`${$hostName}/companies`, {
          headers: header
      }).then(async (resp) => {
          if (resp.ok) {
              if (!resp.data) {
                return  companies = await resp.json();
                  
              }
          }
          throw new Error("Could not find any company");
      });
  }




  function removeItem(id) {
      openList = openList.filter( (item) => item.id !== id );
  }


</script>
<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2">Dashboard</h3>
<div class="flex flex-row mt-4">
  <SideBar/>
  <div class="w-4/5">
      <div class="flex flex-col">
          <div class="py-2 -my-2 overflow-x-auto lg:px-8">
              <div
                      class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
              >
                  <table class="min-w-full">
                      <thead>
                      <tr>
                          <th
                                  class="px-6 py-3 text-m font-medium leading-4 tracking-wider text-left text-black-500 uppercase border-b border-gray-200 bg-gray-50"
                          >
                              {$t("dashboard.openList")}
                          </th>
                          <th class="px-6 py-3 text-m font-medium leading-4 tracking-wider text-left text-black-500 uppercase border-b border-gray-200 bg-gray-50">
                          </th>
                      </tr>
                      </thead>
                  </table>
                  <div class="flex flex-row">
                      <div
                              class="flex flex-col space-y-4 container  px-6 py-6"
                              style="margin-right: 100px; "
                      >
                          <div class="grid grid-cols-2 gap-2  " style="column-gap: 24rem; ">
                              <div>Select Company</div>
                              <!-- <div > <button on:click={resetList} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-large rounded-lg text-l px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 bottom-0 right-0">Reset List</button>
                           </div> -->
                          </div>
                          <ListCard data={companies} on:addtoList={addToList}/>
                      </div>
                      <div
                              class="flex flex-col space-y-4 container  px-6 py-6 border-4 border-indigo-200 border-l-indigo-500 md:border-green-500"
                      >
                          <form on:submit|preventDefault|stopPropagation={showList}>
                              <div class="mb-4">
                                  <label
                                          class="block text-gray-700 text-sm font-bold mb-2"
                                          for="input_list_name"
                                  >
                                      {$t("dashboard.listName")}
                                  </label>
                                  <!-- <input
                                    class="form__group__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    bind:value={list_name}
                                    type="text"
                                  /> -->
                                  <input
                                          bind:value={list_name}
                                          class="form__group__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="input_list_name"
                                          pattern="[a-zA-Z0-9\s]+"
                                          placeholder="List Name"
                                          required
                                          type="text"
                                  />
                              </div>
                              <div class="flex flex-col ">
                                  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                          <div class="overflow-hidden">
                                              <div/>
                                              <table class="min-w-full ">
                                                  <tbody>
                                                  {#each openList as company}
                                                      <tr class="bg-gray-100 border-b">
                                                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                              {num1}
                                                          </td>
                                                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                              {company.name}
                                                          </td>
                                                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                              {company.location}
                                                          </td>
                                                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                              <button
                                                                      type="button"
                                                                      on:click={removeItem(company.id)}
                                                                      class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                                                  <svg
                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                          class="h-5 w-5 mr-2"
                                                                          fill="none"
                                                                          viewBox="0 0 24 24"
                                                                          stroke="currentColor"
                                                                  >
                                                                      <path
                                                                              stroke-linecap="round"
                                                                              stroke-linejoin="round"
                                                                              stroke-width="2"
                                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                      />
                                                                  </svg>
                                                              </button>
                                                          </td>
                                                      </tr>
                                                  {/each}
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="mb-4">
                                  <label
                                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                          for="grid-first-name"
                                  >
                                      {$t("dashboard.inputDate")}
                                  </label>
                                  <input
                                          bind:value={$date}
                                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="grid-first-name"
                                          placeholder="dd-mm-yyyy"
                                          required
                                          type="text"
                                  />
                              </div>
                              <button
                                      class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                      type="submit"
                              >
                                  {$t("dashboard.openList")}
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>