const isLoggedIn = () => {

  let temp = JSON.parse(localStorage.getItem("user"));
  if (temp) {
    return(temp.token);
  }
    // return JSON.parse(localStorage.getItem("user"));
  };
  
  const loginUser = (user) => {
    if(user)localStorage.setItem("user", JSON.stringify(user));
  };
  
  const logoutUser = () => {
    localStorage.removeItem("user");
  };
  
  export { loginUser, isLoggedIn, logoutUser };