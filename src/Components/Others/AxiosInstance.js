import axios from "axios";

const instance = axios.create({
  baseURL: "https://parmartours.com:8443/parmartour/v1.0/",
});

const mofInstance = axios.create({
  baseURL: "https://parmartours.com:8443/parmartour/mof/",
});

export { instance, mofInstance };
