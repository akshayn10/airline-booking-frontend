const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  const exp = localStorage.getItem("exp");

  if (!accessToken || !exp) {
    console.log("No token");
    return false;
  }
  const expirationTime = new Date(parseInt(exp, 10) * 1000);

  const currentTime = new Date();

  if (currentTime < expirationTime) {
    console.log("Token is valid");
    return true;
  } else {
    console.log("Token is expired");
    return false;
  }
};

export { isAuthenticated };
