const useAuth = () => {
  const user = localStorage.getItem("user");
  const isAuth: boolean = user === "undefined" ? false : true;

  return { isAuth, user };
};

export default useAuth;
