import React , {useState} from "react";
import { Formik , useFormik } from "formik";
import * as Yup from 'yup' ;
import './Signup.css'
import LoadingButton from '../LoadingButton/LoadingButton'
import { ToastContainer , toast } from "react-toastify";
import { useNavigate ,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup , loginWithGoogle  } from "../../../services/userApi";
import { setUserDetails } from "../../../Redux/Features/userSlice";
import { useGoogleLogin } from "@react-oauth/google";


function Signup () {

  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch() ;

  // form validation using Yup 
  const validate  = Yup.object({
    firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('First Name Required'),
    email : Yup.string()
    .email('invalid email address')
    .required('Email is required'),
    password : Yup.string()
    .min(6 , 'password must be at least 6 charecters')
    .required("Password is required"),
    confirmpassword : Yup.string()
    .oneOf([Yup.ref('password') , null] , 'Passwords must match')
    .required('Confirm Password is Required')
  });

// formik state
  const formik = useFormik({
    initialValues : {
      firstName: '',
      email:'',
      password: '',
      confirmpassword:''
    },

    validationSchema: validate ,

    onSubmit: async (values) => {
      console.log("onsubmit"); 
      try { 
        setloading(!loading) ;
        const { data } =  await userSignup(values)
     
        if(data.status) {
          navigate("/otp")
        }else {
          setloading(false)
      
          setErrorMessage(data.message) ;
        }

      } catch (error) {
        toast.error(error.message , {
          position: "top-center" ,

        })
      }
    }
  })
  
  const handleChange = (event) =>{
    formik.setValues((prev) => {
      const formFields = {...prev};
      console.log(formFields[event.target.name] , event.target.name);
      formFields[event.target.name] = event.target.value;
      return formFields
    })
  }


  const login = useGoogleLogin({
    
    onSuccess : (codeResponse) => {
      console.log("login with google");
      loginWithGoogle(codeResponse)
      .then((response) => {
        // checking user status 
        console.log("res" , response);
        if(!response.data.user.status) {
          toast.error("Sorry you are Banned ..!" , {
            position: "top-center"
          })
          // navigate('/account/suspended') ;
        }else{
          localStorage.setItem('JwtToken' ,response.data.token )

          dispatch(setUserDetails({
            name : response.data.user.firstName,
            id : response.data.user._id,
            email : response.data.user.email,
            image: response.data.user.picture,
            token: response.data.token,
  
          })
          );
          // succes navigate to home page
  
          navigate("/");
        }

    
    }).catch((err) => {
      toast.error("Something went wrong please reload the page" , {
        position: "top-center",
      })
    } )
    },
    onError :(error)=> {
      console.log("error");
      toast.error("Login Failed" , {
        position: "top-center" ,
      });
    }
  })




  return (
    <Formik>
    <section className="section-box">
      <form  >
        <div className="grid-cols-1 shadow-none sm:shadow-xl form-box p-10 ">
          <h2 className="text-center text-2xl font-medium pb-8 "> Signup </h2>
         {errorMessage ?  <div className="text-red-500 pb-6 text-center ">{errorMessage }</div>  : "" }
         <div className="relative mb-6" data-te-input-wrapper-init> 

         <input type="text" 
          className="peer  block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-violet-900  input-box-border"
          style={{ color: "black" }}
          id="firstName"
          name='firstName'
          onChange={(e) => { handleChange(e) }}
          placeholder="First Name" />
           {
            formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500"> {formik.errors.firstName} </div>
            ) : null }
  
        </div>
        

        <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                className="peer  block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200  dark:placeholder:text-violet-900  input-box-border"
                id="email"
                style={{ color: "black" }}
                name='email'
                onBlur={formik.handleBlur}
                onChange={() => { handleChange(event) }}

                placeholder="Email address" />
              {/* <label
                for="exampleFormControlInput2"
                class="input-box-lable pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Email address
              </label> */}
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-500' >{formik.errors.email}</div>
              ) : null}
            </div> 

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="peer  block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200  dark:placeholder:text-violet-900  input-box-border"
                id="password"
                style={{ color: "black" }}
                name='password'
                onBlur={formik.handleBlur}
                onChange={() => { handleChange(event) }}

                placeholder="Password" />
              {/* <label
                for="exampleFormControlInput2"
                class="input-box-lable pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Password
              </label> */}
              {formik.touched.password && formik.errors.password ? (
                <div className='text-red-500'>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="peer  block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200  dark:placeholder:text-violet-900  input-box-border"
                id="confirmPassword"
                style={{ color: "black" }}
                name='confirmpassword'
                onBlur={formik.handleBlur}
                onChange={() => { handleChange(event) }}

                placeholder="Confirm password" />
              {/* <label
                for="exampleFormControlInput2"
                class="input-box-lable pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Confirm password
              </label> */}
              {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                <div className='text-red-500'>{formik.errors.confirmpassword}</div>
              ) : null}
            </div> 

                <div className="text-center">
                <div className='flex justify-center items-center'>
                <LoadingButton loading={loading}
                  onClick={() => formik.handleSubmit()}>
                  Sign up
                </LoadingButton>

              </div>

              <div onClick={login} className='flex justify-center success-box-border rounded p-2 mt-8'>
                <img src="/images/Screenshot 2023-03-01 111718.png" alt="ggl img" />
                <p className='ml-4'>Google</p>
              </div>

                <Link to={'/login'}>
                <p className="mt-4 mb-0 pt-1 text-sm ">
                  Already On learnwise ?
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  > Log in</a>
                  </p>
                </Link>
                </div>
            </div>
      </form>
      <ToastContainer/>
    </section>
    </Formik>
  )
}


export default Signup