<script>

  import SideBar from "../Components/SideBar.svelte";
  import { onMount, afterUpdate } from "svelte";

  import ListLine from "../Components/ListLine.svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";


  import { t } from "../stores/i18n";

  let date;

//Formatting the current date as dd-mm-year and showing it in the screen
  function formatDate() {
      const now = new Date();
      const dateObject = {
          month: now.getMonth() + 1,
          day: now.getDate(),
          year: now.getFullYear()
      }
      if (dateObject.month.toString().length < 2) dateObject.month = "0" + dateObject.month;
      if (dateObject.day.toString().length < 2) dateObject.day = "0" + dateObject.day;
     date = [dateObject.day, dateObject.month, dateObject.year].join("-");
  }

  let openChanged;

  let openlist = [];


  onMount(() => {
    getList();
    formatDate()
  });


  let time = [];



  //Getting the list of opened companies
  export async function getList() {
    const resp = await fetch(`${$hostName}/openlist`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: window.sessionStorage?.token,
      },
    });

    if (resp.ok) {
      openlist = await resp.json();
     
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }

 
</script>

<div class="flex flex-row space-x-4 relative">
  <div>
    <h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2">Dashboard</h3>
  </div>
 
  <div>
    <h3 class="text-l font-medium text-grey-500 mt-6 mt-9 absolute inset-y-0 right-64 ">{$t("dashboard.today")}: {date}</h3>
  </div>
 
</div>


<div class="flex flex-row mt-4">
  <SideBar />

  <div class="w-4/5 h-96">
    <div class="flex flex-col">
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
                  {$t("dashboard.listName")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Status
                </th>

                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.listDate")}
                </th>

                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.checkListOrders")}
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.close")}/{$t("dashboard.open")}
                </th>
              </tr>
            </thead>

            <ListLine data={openlist}  isOpened={openChanged}/>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
