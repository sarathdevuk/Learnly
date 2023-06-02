const login = useGoogleLogin({
  //onsuccess login
  onSuccess: (codeResponse) => {
    loginWithGoogl(codeResponse)
      .then((response) => {
        //checking the user status
        if (response.data.status === "Blocked") {
          navigate('/account/suspended');
        }
        //seting the token to localstorage
        localStorage.setItem('JwtToken', response.data.token);
        //seting the user details to redux
        dispatch(
          setUserDetails({
            name: response.data.user.firstName,
            id: response.data.user._id,
            email: response.data.user.email,
            image: response.data.user.picture,
            token: response.data.token,
          })
        );
        //nvaigate to home page
        navigate("/");
      }).catch((err) => {
        toast.error("Something went wrong please reload the page", {
          position: "top-center",
        });
      })
  },
  //login error
  onError: (error) => {
    toast.error("Login Failed", {
      position: "top-center",
    });
  }
});