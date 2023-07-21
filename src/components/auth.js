const Auth = {
  isAuthenticated: false,
  logout: () => {
    Auth.isAuthenticated = false;
    localStorage.removeItem("isAuthenticated");
  },
  login: () => {
    Auth.isAuthenticated = true;
    localStorage.setItem("isAuthenticated", true);
  },
  checkAuth: () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    Auth.isAuthenticated = isAuthenticated === "true";
  },
};

export default Auth;
