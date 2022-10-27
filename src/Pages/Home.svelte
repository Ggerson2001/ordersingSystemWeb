<script>


  import OpenCard from "../Components/OpenCard.svelte";
  import { onMount } from "svelte";
  import { userId, hostName, BACKEND_PORT } from "../stores/store.js";
  import { userType } from "../stores/store";
  import tokenStore from "../stores/token";


  let openlist = [];
  let listEmpty=false;


  //Mounting the getList method as soon as the screen is opened
  onMount(async () => {
    getList();
  
    
  });





  if ($tokenStore == null) {
    $tokenStore = token;
  }


  //Getting the list of opened list in the system
  export async function getList() {


    await fetch(`${$hostName}/openedList`, {
      method: "GET",

      headers: {
        Authorization: window.sessionStorage?.token,
        "Access-Control-Allow-Private-Network": "true",
      },
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((userData) => {
        openlist = userData;
        
       
        if(userData.length==0){
            listEmpty=true;
            
        };
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  
</script>

<div
  class="home w-full   p-6 bg-[url('https://i.pinimg.com/736x/02/26/f2/0226f2f34631f9af64f74dc4590dc911.jpg')]"
>
  <!-- Card Container Start -->

  <div class="flex flex-wrap ">
    <OpenCard data={openlist} />
  </div>

  {#if listEmpty}
<div class="flex justify-center items-center h-screen text-5xl">
  No open list present
</div>
{/if}
</div>



<style>
  .home{
    background-image: url("https://i.pinimg.com/originals/20/c9/2c/20c92c431738efd4c6ce392dc76b6ae4.jpg");
    background-size: cover;
    height: 100%;
    width: 100%;
    top: 0;
    background-repeat: no-repeat;
    
  }
</style>


