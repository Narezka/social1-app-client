import axios from "axios";


export const makeRequest = axios.create({
  baseURL: "https://social1-app.herokuapp.com/api/",
  withCredentials: true,
});
