import axios from "axios";

export const instance = axios.create({
  baseURL: "https://mega-systems-server.onrender.com/api/v1",
});
