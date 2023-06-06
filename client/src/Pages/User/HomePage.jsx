import React from "react";
import UserHeader from "../../Componants/User/UserHeader/UserHeader";
import BannerWithSearch from "../../Componants/User/Banner/BannerSearch";

function HomePage () {
  return(
    <React.Fragment>
    <UserHeader/>
    <BannerWithSearch/>
    </React.Fragment>
  )
}

export default HomePage 