import { writable } from "svelte/store";


export default writable({
  token: (window.sessionStorage.getItem("token") || window.sessionStorage.getItem("token-microsoft")|| ""),
});

// token.subscribe((val)=>browser && sessionStorage.setItem("token",val.token))

