import { signout } from "./ApiAuth";

export default {
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      localStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("jwt"))
      return JSON.parse(localStorage.getItem("jwt"));
    else return false;
  },
  // recebe um callback como argumento e remove a credencial JWT
  // a função callback é executada após a remoção
  clearJWT(cb) {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    cb();
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};
