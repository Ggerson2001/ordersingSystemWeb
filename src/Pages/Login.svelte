<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { fade } from "svelte/transition";
  import tokenStore from "../stores/token";
  import md5 from "md5";
  import { hostName, BACKEND_PORT } from "../stores/store.js";
  import { t } from "../stores/i18n";
  import {push, pop, replace} from 'svelte-spa-router'
	import { link } from 'svelte-spa-router'
  import { firstName, lastName, userId, userType,profileImage } from "../stores/store.js";
  import router from "page";

  let wrontInput = false;
  let username = "";

  const hostOrigin = window.location.origin;

  //Getting the token parameter from the url the url 
  const urlParams = new URLSearchParams(window.location.search);

  //Boolean to show if token exists in the url after retrieving from Scorion Backend
  const isBeta = urlParams.has("token");


  //Removing the token from url after navigating to home screen 
  var newURL = location.href.split("?")[0];
  window.history.pushState('object', document.title, newURL);








  //Storing the token retrieved in token store
  $tokenStore = urlParams.get("token");
  //Storing the token in session storage so that after refresh user is not logged out
  window.sessionStorage.setItem('token',$tokenStore); 


  onMount(async () => {
    if (isBeta) {
      getUser();
      
    } else {
      signIn;
      
    }

    

  });

  let isLoggedIn = false;
  let userEmail = "";
  let userPassword = "";

  function redirect() {
   
    setTimeout(() => {
      if ($tokenStore != null) {
        
        push("/home");
      }
    }, 1000);

    // console.log(router.current);
  }

  let login;


  /*
  Microsoft Login
  This request redirects the user to microsoft login screen , the user is authenticated in the scorion backend
  and the callback url is snackion2 project where is send the token of the user authenticated

  */
  async function onGet() {
    const callbackUrl = encodeURI(`${hostOrigin}/snackion2`);
    await axios.get(`https://backend.dev.parantion.nl/backend/api/v51/account/portal?name=snack&return=https%3A%2F%2Fbackend.dev.parantion.nl%2Fbackend%2Fapi%2Fv51%2Faccount%2Fportal%2Flink%3Ftoken%3Dtoken%26name%3Dsnack%26link%3D${callbackUrl}`)
      .then((resp) => {
    

        if (resp.data.portal == null) {
          console.error("Portal is not retrieved from the api");
        } else if (resp.data.portal != null) {
          console.log("Log in succesfully");
          let login = resp.data.portal[0].login;
          location.replace(login);
         
        }
      });
  }


  /*
    Getting the user data by sending a request to Scorion Backend providing the Database name , token retrieved from OnGet Request.
    After the data is retrieved they are stored in svelte store for global usage in all components (stores/store.js)
    Also the information is stored in the session storage so that the data is not lost after refreshing
  */
  async function getUser() {
    await fetch("https://backend.dev.parantion.nl/backend/api/v51/account/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Database": "lab",
        "X-CSRFToken": window.sessionStorage?.token,
      },
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((userData) => {
        $firstName = userData.user.firstname;
        $lastName = userData.user.lastname;
        username = userData.user.username;
        $userId = userData.authenticate.uid;
        $userType = userData.role.find(type => {
  
  return type.includes(substring)
  })
;
        $profileImage = userData.user.profile_photo;

        
      
    
        window.sessionStorage.setItem('user',$userType);
        window.sessionStorage.setItem('userID',$userId);
        window.sessionStorage.setItem('firstName',$firstName);
        window.sessionStorage.setItem('lastName',$lastName);

      

        setTimeout(() => {
          push("/home");
        }, 500);
      })
      //Then with the error genereted...
      .catch((error) => {
        // console.error('Error:', error);
        console.log("Invalid login attempt");
      });
  }



  /*
  Login with username

  Post request where the user provides the email and password (hashed password with md5)
  User data is retrieved and stored in svelte store also in session storage
  */
  const substring = 'panel_moderator';
  async function signIn() {
    fetch("https://backend.dev.parantion.nl/backend/api/v51/account/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Database": "lab",
      },
      body: JSON.stringify({
        username: userEmail,
        password: md5(userPassword),
      }),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        const result = data.token;
        $tokenStore = result;

        $firstName = data.user.firstname;
        $lastName = data.user.lastname;
        $userId = data.authenticate.uid;
        $profileImage = data.user.profile_photo;


      

        $userType = data.role.find(type => {
  
        return type.includes(substring)
        })
    ;
       
        window.sessionStorage.setItem('token',result); 
        window.sessionStorage.setItem('user',$userType);
        window.sessionStorage.setItem('userID',$userId);
        window.sessionStorage.setItem('firstName',$firstName);
        window.sessionStorage.setItem('lastName',$lastName);
       
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error("Error:", error);
        console.log("Invalid login attempt");
        wrontInput = true;
  
      });
  }
</script>



<div
  class="min-h-screen flex flex-col items-center justify-center bg-gray-300 first-div"
>
  <div
    class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
  >
    <div
      class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800"
    >
      {$t("login.loginToAccount")}
    </div>
    <button
      on:click={onGet}
      class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
    >
      <span
        class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"
        ><i class="fab fa-facebook-f" /></span
      >
      <span>{$t("login.singleSignOn")} </span></button
    >
    <div class="relative mt-10 h-px bg-gray-300">
      <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
        <span class="bg-white px-4 text-xs text-gray-500 uppercase"
          >{$t("login.or")}</span
        >
      </div>
    </div>
    <div class="mt-10">
      <form on:submit|preventDefault={signIn}>
        <div class="flex flex-col mb-6">
          <label
            for="email"
            class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >{$t("login.email")}:</label
          >
          <div class="relative">
            <div
              class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>

            <input
              id="email"
              name="email"
              class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              bind:value={userEmail}
              required
              placeholder={$t("login.email")}
            />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <label
            for="password"
            class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >{$t("login.password")}:</label
          >
          <div class="relative">
            <div
              class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
            >
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              bind:value={userPassword}
              required
              placeholder={$t("login.password")}
            />
          </div>
        </div>

        {#if wrontInput}
          <span style="color:red">{$t("login.incorrect")}</span>
        {/if}

        <div class="flex w-full">
          <button
            on:click={redirect}
            type="submit"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
          >
            <span class="mr-2 uppercase">{$t("login.login")}</span>
            <span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>


  .first-div {
    background-image: url("https://cdn.wallpapersafari.com/79/70/tHB4jT.jpg");
    background-size: cover;
    
  }
</style>
