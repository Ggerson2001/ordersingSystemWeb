<script>
  import SideBar from "../Components/SideBar.svelte";
  import CompanySquare from "../Components/CompanySquare.svelte";
  import { onMount, afterUpdate } from "svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import {companyList} from "../stores/store";
  import { link } from 'svelte-spa-router'
  import { t } from "../stores/i18n";
  
  onMount( () => {
    getCompanies();
  });



  //Gettingall the companies present in the system
  export async function getCompanies() {
    const resp = await fetch(`${$hostName}/companies` , {
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
       },
   });
    if (resp.ok) {
      $companyList = await resp.json();
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }


</script>
<h3 class="text-3xl font-medium text-gray-700 mt-6">Dashboard</h3>
<div class="flex flex-row mt-4">
  <SideBar />
  <div class="w-4/5">
    <div class="flex flex-col ">
      <div class="py-2 -my-2 overflow-x-auto lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.listCompanies")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  <a href="/addcompany" use:link
                    ><button
                      class="px-8 py-2 text-white bg-green-500 rounded shadow-xl"
                    >
                      {$t("dashboard.addCompany")}
                    </button>
                  </a>
                </th>
              </tr></thead
            >
            <div class="container mx-auto px-6 py-6 grid grid-cols-4 gap-24">
              <CompanySquare data={$companyList} />
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
