<script
  src="C:\Users\GersonGjoni\Projects\svelte-tailwind-prototypes\prototype 1\src\App.svelte">
  import router from "page";


  import Home from "./Pages/Home.svelte";
  import UserOverview from "./Pages/UserOrderOverview.svelte";

  
  import Company from "./Pages/Company.svelte";
  import Login from "./Pages/Login.svelte";
 
  import ListOverview from "./Pages/ListOverview.svelte";
  import OpenList from "./Pages/OpenList.svelte";
  import AddCompany from "./Pages/AddCompany.svelte";
  import AdminListCompany from "./Pages/AdminListCompany.svelte";
  import SingleCompany from "./Pages/SingleCompany.svelte";
  import AddProduct from "./Pages/AddProduct.svelte";
  import SingleProduct from "./Pages/SingleProduct.svelte";
  import CompList from "./Pages/CompList.svelte";
  import OrderOverview from "./Pages/OrderOverview.svelte";
  import TotalOrders from "./Pages/TotalOrders.svelte";
  import Payment from "./Pages/Payment.svelte";
  import HeaderTest from "./Components/HeaderTest.svelte";
  import Router from 'svelte-spa-router'
  import translations from "./translations";
  import { dict, locale } from "./stores/i18n";

  $: dict.set(translations);

  $: languages = Object.keys(translations);

  let page1;
  let params;
  // router.base("/snackion2/#");

  const routes = {

  
  '/': Login,
  '/home':Home,
  "/openlist/:id":CompList,
  "/orderOverview":ListOverview,
  "/addcompany":AddCompany,
  "/openlist":OpenList,
  "/singlecompany/:id":SingleCompany,
  "/singleproduct/:id":SingleProduct,
  "/companyList":AdminListCompany,
  "/paymentSuccesfull/:id":Payment,
  "/userOrders/:id":UserOverview,
  "/companies/:id":Company,
  "/orders/:id":OrderOverview,
  "/ordersTotal/:id":TotalOrders,
  "/products/companies/:id":AddProduct,


}


</script>

<HeaderTest />
<Router {routes}  />
  
  
  
  <svelte:component this={Router} class="component"  />



  <style>
 
  </style>


<!-- {/if}  -->

<!-- <svelte:component this={page} {params} />-->



