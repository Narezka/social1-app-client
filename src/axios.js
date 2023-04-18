import axios from "axios";


export const makeRequest = axios.create({
  baseURL: "https://social-app-heroku.herokuapp.com/api/",
  withCredentials: true,
});
