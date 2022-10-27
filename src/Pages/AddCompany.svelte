<script>
  import SideBar from "../Components/SideBar.svelte";
  import { v4 as uuidv4 } from "uuid";
  import { t } from "../stores/i18n";
  import {companyList} from "../stores/store";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { link } from 'svelte-spa-router'
  import {imageLink} from "../stores/store";
  import {push} from 'svelte-spa-router'
  import router from 'svelte-spa-router'

  let nameInput;
  let typeInput;
  let locationInput;
  let contactInput;
 



  //Adding a new company to the system
  async function addCompany() {
 
    const newProduct = await fetch(
      `${$hostName}/companies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':window.sessionStorage?.token,
          'Access-Control-Allow-Origin':'*' 
        },
        body: JSON.stringify({
          id: uuidv4(),
          name: nameInput,
          type: typeInput,
          location: locationInput,
          imageLink:$imageLink,
          contact:contactInput
        }),
      }
    );
    $companyList.push(newProduct)
   
              await push("/companyList");

   
    
  }




</script>
<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2">Dashboard</h3>
<div class="flex flex-row mt-4">
  <SideBar />
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
                {$t("dashboard.addNewCompany")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                />
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                />
                <th
                  class="px-6 py-3 text-m font-medium leading-4 tracking-wider text-left text-black-500 uppercase border-b border-gray-200 bg-gray-50"
                >
              
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>

            
            <div class="flex flex-row ">
              <form on:submit|preventDefault|stopPropagation={addCompany}>
              <div class="container mx-auto px-6 py-6">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      {$t("dashboard.companyName")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      pattern="[a-zA-Z0-9\s]+"
                      bind:value={nameInput}
                      required
                      placeholder={$t("dashboard.companyName")}
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      {$t("dashboard.location")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                    
                      bind:value={locationInput}
                      required
                      placeholder={$t("dashboard.location")}
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                    {$t("dashboard.description")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      pattern="[a-zA-Z0-9\s]+"
                      bind:value={typeInput}
                      required
                      
                      placeholder="Description"
                    />
                  </div>
                </div>
        

                
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                    {$t("dashboard.linkOfImage")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                     
                      bind:value={$imageLink}
                      required
                      placeholder="Image Link"
                    />
                  </div>
              </div>

               

                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                    {$t("dashboard.contact")}
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="number"
                      pattern="[0-9\s]+"
                      bind:value={contactInput}
                      required
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <br />

                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                  <button
                      class="w-60 px-4 py-2 text-white bg-green-500 rounded shadow-xl "
                      type="submit"
                     
                    >    {$t("dashboard.add")}
                  
                  </button>
                  </div>
                </div>
               
              </div>
              </form>
            </div>
        
          </table>
        </div>
      </div>
    </div>
  </div>
</div>