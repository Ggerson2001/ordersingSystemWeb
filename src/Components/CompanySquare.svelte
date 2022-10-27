<script>
  export let data = [];
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import {companyList} from "../stores/store";
    import { link } from 'svelte-spa-router'
  import { t } from "../stores/i18n";


  //Deleting a company from the system
  const deleteCompany = async (id) => {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
      const response = await fetch(
        `${$hostName}/companies/` + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization':window.sessionStorage?.token,
            'Access-Control-Allow-Origin':'*' 
          },
          body: null,
        }
      ).then( (response) =>{
        const companyList_temp = $companyList.filter( (company) => company.id != id)
        $companyList = companyList_temp
      });
    } else {
      return false;
    }
    // now do whatever you want with the data
 
  };
</script>
{#each data as item}
  <div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg w-56">
      <div class="image h-30  " style="background-image: url({item.imageLink});">
    
      </div>
     
      <!-- <img
        class="w-full"
        src={item.imageLink}
        alt="Company"
      /> -->
      <div class="px-2 py-2">
        <div class="font-bold text-xl mb-2 ml-4">{item.name}</div>
        <div class=" text-m mb-2 ml-4">{item.type}</div>
        <div class=" text-m mb-2 ml-4">0{item.contact}</div>
        <p class="text-gray-700 text-base" />
      </div>
      <div class="relative relative px-6 pt-4 pb-5  ">
        <div class="flex flex-row">
          <div>
            <a href="/singlecompany/{item.id}" use:link
              ><button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-large rounded-lg text-l px-10 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bottom-0 right-0"
              >
                {$t("dashboard.edit")}
              </button>
            </a>
          </div>
          <div>
            <button
              type="button"
              on:click={deleteCompany(item.id)}
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-large rounded-lg text-l px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 bottom-0 right-0"
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
      </div>
    </div>
  </div>
{/each}

<style>
  .image{

    height: 150px;
    
     background-size: cover;
     background-position: center;
 
  }
</style>