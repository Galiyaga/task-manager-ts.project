import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
      "API-KEY": "b983fdd2-6d82-4150-88ca-bd6a10af1e07",
    },
  };
  
export const baseInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings,
  });