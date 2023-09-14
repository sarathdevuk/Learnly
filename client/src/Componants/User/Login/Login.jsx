import React , {useState , useEffect } from 'react';
import './Login.scss'
import { useNavigate ,Link } from "react-router-dom";
import { useDispatch  } from 'react-redux';
import { setUserDetails } from '../../../Redux/Features/userSlice';
import { setAdminDetails } from '../../../Redux/Features/adminSlice';
import { adminLogin, authAdmin } from '../../../services/adminApi';
import { authTutor, tutorLogin } from '../../../services/tutorApi';
import { authUser , loginWithGoogle, userLogin } from '../../../services/userApi';
import { ToastContainer , toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import { setTutorDetails } from '../../../Redux/Features/tutorSlice';



function Login(props){

  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const [loginData , setLoginData] = useState({
    email: "" ,
  password : ""
 });

//  checking the props for Each role 

useEffect(() => {

  if(props.admin) {
    authAdmin().then((response) =>{
      console.log("navigated to dash");
      if(response.data.status) navigate('/admin/dashboard'); 

    })
  }else if(props.tutor){
    console.log("tutor auth check ");
    authTutor().then((response)=>{
      if(response.data.status) navigate('/tutor/dashboard'); 
    })
  }else{
    authUser().then((response)=>{
      if(response.data.status) navigate('/')
    })
  }

}, [])

// toastify error
 
const generateError = (err) => {
  toast.error(err, {
    position: "top-center",
    toastId: "error"
  })
};


// login wih google 

const login = useGoogleLogin({
  onSuccess: (codeResponse) => {
      try {
          loginWithGoogle(codeResponse)
          .then((response) => {
         
              if (!response.data.user.status) {
                generateError("Sorry You are banned")
                  // navigate('/account/suspended');
              }else{
                  localStorage.setItem('JwtToken', response.data.token);
                  dispatch(
                      setUserDetails({
                          name: response.data.user.firstName,
                          id: response.data.user._id,
                          email: response.data.user.email,
                          image: response.data.user.picture,
                          token: response.data.token,
                      })
                  );
                  navigate("/");
              }
          }).catch((err) => {
              generateError("Something went wrong please reload the page") })
      } catch (err) {
          generateError("Something went wrong please reload the page")
      }
  },
  onError: (error) => {
      generateError("Login Failed")
  }
});

const handleSubmit = async () => {
  try {

    console.log(loginData);
    const { data } = await userLogin(loginData)
    if(data) {
      if(data.status ==='Blocked'){
        navigate('account/suspended')
      }
      if(data.login) {
        localStorage.setItem('JwtToken' , data.token);

        // Adding that data to the Redux store 
        dispatch(
          setUserDetails({
            name: data.user.firstName,
            id: data.user._id ,
            email: data.user.email,
            image : data.user.picture,
            token : data.token
            
          })
        );
        navigate("/")

      }else{
       generateError(data.message) ;
      }
    }else{
      generateError("Error")
    }
  } catch (error) {
    generateError(error.message)
  }
}

const handleAdminSubmit = async () => {
  try {
   
    const {data} = await adminLogin(loginData)
    if(data.login){
      localStorage.setItem('adminJwtToken', data.token) ;

      dispatch(
        setAdminDetails ({
          id: data.admin._id,
          login : data.login ,
          token : data.token ,

        })
      )
        navigate('/admin/dashboard')
    }else{
      generateError(data.message)
    }

  } catch (error) {
    console.log(error);
    generateError(error.message) ;
    
  }
}
const handleTutorSubmit = async () => {
  console.log("tutorsubmit");
    try {
      const {data} = await tutorLogin(loginData)
      if(data.login) {
        console.log("data" , data);
        localStorage.setItem('tutorJwtToken' , data.token)  ;
        
        dispatch (
          setTutorDetails({
            id : data.tutor._id ,
            email : data.tutor.email ,
            firstName : data.tutor.firstName,
            lastName : data.tutor.lastName ,
            login : data.tutor.login,
            token : data.tutor.token ,

          })
        )
          console.log("navigated");
        navigate('/tutor/dashboard')
      } else {
        generateError(data.message)
      }


    } catch (error) {
        generateError(error.message)      
    }
}



  return(
    
    <div className=''>

      
  <section className="section-box  ">
  <div className="image w-96 h-96">
      <img src="/images/learning.jpg" alt="" />
      </div>

    <form action="">
      <div className="grid-cols-1 shadow none sm:shadow-xl form-box p-10">
        <h2 className="text-center text-2xl font-medium pb-8"> {props.admin ? "Admin " : props.tutor ? "Tutor" : " " } 
        Login 
         </h2>

         <div className="raltative mb-6 " data-te-input-wrapper-init>
          <input type="email"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem ] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placholder:text-violet-900 input-box-border"
          id="email"  
         style={{color :"black" }}
         name="email"
         onChange={(e) => {setLoginData ({...loginData , email : e.target.value })}}
         placeholder="Email address"  />
         
         </div>
      <div className="relative mb-6" data-te-input-wrapper-init>
         <input
           type="password"
           className="peer  block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200  dark:placeholder:text-violet-900  input-box-border"
           id="password"
           style={{ color: "black" }}
         name='password'
         onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
         
         placeholder="Password" />
       </div>

      <div className="text-center" >

        <button className="form--btn mt-2 font-medium rounded "
        onClick={props.admin ? handleAdminSubmit : props.tutor ? handleTutorSubmit : handleSubmit}
        type="button">
           Login  
        </button>

      {props.admin || props.tutor ? "" :   
        
          <div>
             <div className='flex justify-center success-box-border rounded p-2 mt-8 bg-green-500 text-cyan-50'
                       onClick={login}           
           >
             <img src="/images/Screenshot 2023-03-01 111718.png" alt="" />         
             <p className='ml-2 mt-1 font-medium '>Continue with Google</p>
              </div>
        
          <Link to={'/signup'}  >
            <p className="mt-4 mb-0 pt-1 text-sm "> 
            Don't have an account .? 
            <a href="#!"   className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >Register </a>
            </p>
          </Link>


          </div>
        } 
         </div>
      </div>
   </form>

    <ToastContainer/>
  </section>
  </div>


  )
}

export default Login
