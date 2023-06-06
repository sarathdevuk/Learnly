// import { useEffect , useRef } from "react";
// import PropTypes from 'prop-types' ;
// import './LoadingButton.scss'


// const Button = (props)=>{
//   console.log("Loading");
//   const btnRef = useRef()

//   //  useEffect(() => {
//   //       const btnWidth = btnRef.current.clientWidth + 19;
//   //       btnRef.current.style.width = btnWidth + 'px';
//   //   }, []);
//   return (
//     <button
//     type="button" 
//     ref = {btnRef} 
//     className="loading-btn w-auto form-btn mt-2 font-medium rounded"
//     onClick = {props.onClick}>

//       <span className=  {`spinner ${props.loading ? 'active' : ''}`}>

//         <i className="bx bx-loader-alt bx-spin"></i>
//       </span>

//       <span className="txt">
//         {props.children}
//       </span>
//     </button>

//   )
// }

// Button.propTypes = {
//   children : PropTypes.node,
//   loading : PropTypes.bool ,
//   onclick : PropTypes.func 
// }

// export default Button ;

// import { useEffect, useRef } from "react";
// import PropTypes from 'prop-types';
// import './LoadingButton.scss';

// const Button = (props) => {
//   console.log("Loading");
//   const btnRef = useRef();

//   // useEffect(() => {
//   //   const btnWidth = btnRef.current.clientWidth + 19;
//   //   btnRef.current.style.width = btnWidth + 'px';
//   // }, []);

//   return (
//     <button
//       type="button"
//       ref={btnRef}
//       className="loading-btn w-auto form-btn mt-2 font-medium rounded"
//       onClick={props.onClick}
//     >
//       <span className={`spinner ${props.loading ? 'active' : ''}`}>
//         <i className="bx bx-loader-alt bx-spin"></i>
//       </span>

//       <span className="txt">
//         {props.children}
//       </span>
//     </button>
//   );
// }

// Button.propTypes = {
//   children: PropTypes.node,
//   loading: PropTypes.bool,
//   onClick: PropTypes.func
// }

// export default Button;

import React from "react";
import PropTypes from 'prop-types';
import './LoadingButton.scss';

const LoadingButton = (props) => {
  return (
    <button
      type="button"
      className={`loading-btn  form-btn  font-medium rounded ${props.loading ? 'loading' : ''}`}
      onClick={props.onClick}
      disabled={props.loading}
    >
      {props.loading ? (
        <span className="spinner">
          <i className="bx bx-loader-alt bx-spin" style={{width:'10px'}} ></i>
        </span>
      ) : (
        <span className="txt">
          {props.children}
        </span>
      )}
    </button>
  );
};

LoadingButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default LoadingButton;
