import React from "react";
import UserHeader from "../../Componants/User/UserHeader/UserHeader";
import BannerWithSearch from "../../Componants/User/Banner/BannerSearch";
import Footer from "../../Componants/User/Footer/Footer";

function HomePage () {
  return(
    <React.Fragment>
    <UserHeader/>
    <BannerWithSearch/>
    <Footer/>
    </React.Fragment>
  )
}

export default HomePage 