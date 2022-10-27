<script>
  import SideBar from "../Components/SideBar.svelte";
  import ProductSquar from "../Components/ProductSquar.svelte";
  import { onMount, afterUpdate } from "svelte";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";
  import {products} from "../stores/store";
  import tokenStore from "../stores/token";
  import {imageLink} from "../stores/store";
  import {push} from 'svelte-spa-router'
  // let products = [];
  export let params;
  import { link } from 'svelte-spa-router'

  onMount(async () => {
    getCompanyProducts();
    getCompanyInfo();
  });

  let name;
  let type;
  let location;
  let image;
  let contact;

  let nameInput;
  let typeInput;
  let locationInput;
  let imageInput
  let contactInput;

  let compInfo;


  //Updating company 
  const updateCompany = async () => {
  
    const response = await fetch(
      `${$hostName}/companies/` + params.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization':window.sessionStorage?.token,
          'Access-Control-Allow-Origin':'*' 
        },
        body: JSON.stringify({
          name: nameInput,
          type: typeInput,
          location: locationInput,
          imageLink:imageInput,
          contact:contactInput
        }),
      }
    ).then((response) => response.json())
    .then(await push("/companyList"));
    // console.log(response);
  };


  //Getting the products for each company
  async function getCompanyProducts() {
    const resp = await fetch(
      `${$hostName}/products/company/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   } );

    if (resp.ok) {
      $products = await resp.json();
    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }


  //Getting company information and storing it in svelte store
  async function getCompanyInfo() {
    const resp = await fetch(
      `${$hostName}/companies/info/` + params.id
      , {
       
           
       headers: {
           'Content-Type': 'application/json',
           'Authorization':window.sessionStorage?.token,
           'Access-Control-Allow-Origin':'*' 
           
       },
  
   });

    if (resp.ok) {
      compInfo = await resp.json();
      name = compInfo[0].name;
      type = compInfo[0].type;
      location = compInfo[0].location;
      image=compInfo[0].imageLink;
      contact=compInfo[0].contact;

      nameInput = name;
      typeInput = type;
      locationInput = location;
      imageInput=image;
      contactInput=contact;

      console.log(compInfo)

    } else if (resp.data === "") {
      throw new Error("Could not find any company");
    }
  }
</script>

<h3 class="text-3xl font-medium text-gray-700 mt-6 ml-2">Dashboard</h3>

<div class="flex flex-row mt-4">
  <SideBar />

  <div class="w-4/5">
    <div class="flex flex-col grid grid-cols-1 divide-y">
      <div class="py-2 -my-2 overflow-x-auto lg:px-8 grid grid-cols-1 divide-y">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg "
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.editCompany")}
                </th>
              </tr></thead
            >
            <div class="container mx-auto px-6 py-6 ">
              
             <form on:submit|preventDefault|stopPropagation={updateCompany}>
                <div class="w-full max-w-lg">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                        required
                        bind:value={nameInput}
                        placeholder={name}
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        {$t("dashboard.type")}
                      </label>
                      <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        required
                        pattern="[a-zA-Z0-9\s]+"
                        bind:value={typeInput}
                        placeholder={type}
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                        pattern="[a-zA-Z0-9\s]+"
                        required
                        bind:value={locationInput}
                        placeholder={location}
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                      
                        required
                        bind:value={imageInput}
                        placeholder={image}
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                        required
                        bind:value={contactInput}
                        placeholder={contact}
                      />
                    </div>
                  </div>

              <button
                      type="submit"
                      class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                     
                    >
                      {$t("dashboard.update")}
                    </button>
                  </div>
              </form>
           
            </div>



            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {$t("dashboard.listOfCompProd")}
                </th>

                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  <a href="/products/companies/{params.id}" use:link
                    ><button
                      class="px-8 py-2 text-white bg-green-500 rounded shadow-xl"
                    >
                      {$t("dashboard.addProduct")}
                    </button>
                  </a>
                </th>
              </tr>
              </thead>


            <div class="container mx-auto px-6 py-6 grid grid-cols-4 gap-24">
              <ProductSquar data={$products} />
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
