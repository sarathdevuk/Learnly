import React from "react";
import MoonLoader from "react-spinners/MoonLoader"

function Loader ({ loading }) {
  return(
    <div className="flex justify-center items-center">
      <MoonLoader 
          color={"#5d45cd"}
          loading={loading}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
      />

    </div>
  )
}

export default Loader 