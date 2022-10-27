import { writable } from "svelte/store";
export const date = writable("");
export let firstName = writable(window.sessionStorage.getItem("firstName")||"");
export let lastName = writable(window.sessionStorage.getItem("lastName")||"");
export let listId = writable("");
export const userId = writable(window.sessionStorage.getItem("userID")||"");
export let userType = writable(window.sessionStorage.getItem("user")||[]);



export let opened = writable();
export let profileImage=writable();
export let companyList = writable([]);
export let products = writable([]);


export const hostName = writable("https://projectapi4.parantion.nl");
// export const hostName = writable("http://localhost:3080");

export let imageLink= writable("");
export let productImage= writable("");

export let BACKEND_PORT = writable("3080");
