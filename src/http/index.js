  
  import axios from "axios"
  import { md5 } from 'js-md5';

  export const API_URL = "https://api.valantis.store:41000/";

  const actualDate = new Date();
  const isoDate = actualDate.toISOString().slice(0, 10).replaceAll("-", "");
  const template = `Valantis_${isoDate}`;

  const api = axios.create({
    baseURL: API_URL,
    headers: {
        "X-Auth": md5(template)
    }
  })

  export default api;
