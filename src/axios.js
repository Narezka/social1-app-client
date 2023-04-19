import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://social-app-heroku.herokuapp.com/api/",
  withCredentials: true,
});

// export const makeRequest = fetch(
//   "https://social-app-heroku.herokuapp.com/api/",
//   {
//     method: "GET",
//     credentials: "include",
//   }
// ).then((res) => {});
