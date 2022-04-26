import store from "../store/index";
export default async function (to, from) {
  let login = store.getters["auth/getLoginApiStatus"];
  // if logged in & requires authentication
  if (login === true && to.meta.auth === true) {
    console.log("success");
  } else if (login === true && to.meta.auth === false) {
    // if logged in and the route that requires no autehntication like login & register
    console.log("already logged in");
    return { path: "/" };
    // protected route
  } else {
    // if not logged in
    await store.dispatch("auth/refreshAuth"); // see if refresh token is working
    let newLoginStatus = store.getters["auth/getLoginApiStatus"];

    //get the new status
    if (newLoginStatus === false && to.path !== "/login")
      return { path: "/login" };
    if (newLoginStatus === true && to.path === "/login") return { path: "/" };
  }
}
