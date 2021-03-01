import axios from "axios";

const baseURL = process.env.VUE_APP_API;
const request = axios.create({ baseURL });

export default request;
