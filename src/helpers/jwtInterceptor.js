import axios from "axios";
import store from "../store/index";

let baseURL = `${process.env.SERVER_NAME}`;

const jwtInterceptor = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  credentials: "include",
});

// Set auth header for requests
jwtInterceptor.interceptors.request.use((config) => {
  let authData = store.getters["auth/getJWT"];
  if (authData == null) {
    return config;
  }
  config.headers.common["Authorization"] = `TOKEN ${authData}`;
  return config;
});

// if response is error
jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // unauthorized error
    if (error.response.status === 401) {
      // var response = await axios.post("api/refresh");
      // await store.dispatch("auth/refreshApi", response.data);
      await store.dispatch("auth/refreshAuth");
      // error.config.headers[
      //   "Authorization"
      // ] = `bearer ${response.data.access_token}`;
      let authData = store.getters["auth/getJWT"];

      error.config.headers["Authorization"] = `TOKEN ${authData}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
jwtInterceptor.defaults.withCredentials = true;
export default jwtInterceptor;
