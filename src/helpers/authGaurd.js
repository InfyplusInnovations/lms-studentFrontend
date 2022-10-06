import store from "../store/index";

export default async function (to, from) {
  let login = store.getters["auth/getLoginApiStatus"];

  //  pages that require authentication
  if (to.meta.auth === true) {
    if (login != true || login == null) {
      await store.dispatch("auth/refreshAuth"); // see if refresh token is working
      let newLoginStatus = store.getters["auth/getLoginApiStatus"];
      console.log(newLoginStatus);
      if (newLoginStatus !== true) return { path: "/login" };
    }
    console.log("success");
  }
  // pages that does not require auth
  if (to.meta.auth == false) {
    if (login == true && to.path !== "/") {
      return { path: "/" };
    }
  }
}
