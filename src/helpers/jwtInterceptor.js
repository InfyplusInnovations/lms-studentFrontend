import axios from "axios";
import store from "../store/index";

const jwtInterceptor = axios.create({ baseURL: "http://localhost:8000/" });
// Set auth header for requests
jwtInterceptor.interceptors.request.use((config) => {
  const authData = store.getters["auth/getJWT"];
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
      error.config.headers[
        "Authorization"
      ] = `bearer ${store.getters["auth/getJWT"]}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
