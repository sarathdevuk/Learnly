import React from "react";
import { useFormik , Formik } from "formik";

import * as Yup from 'yup' ;
import { ToastContainer , toast } from "react-toastify";
import { changePassword } from "../../services/tutorApi";




  function ChangePassword (){

    const validate = Yup.object({
      oldpassword : Yup.string()
      .min(6 , "Password must be atleat 6 charecters")
      .required('Password is Required'),
      password : Yup.string()
      .notOneOf([Yup.ref('oldpassword')] , "Old password and New passwod cant be same")
      .min(6 , "Password must be atleat 6 charecters")
      .required('Password is Required'),
      confirmpassword : Yup.string()
      .oneOf([Yup.ref('password') , null] , 'Password and ConfirmPassword must match' )
      .required("ConfirmPassword Required")
    })

    const formik = useFormik({
      initialValues : {
        oldpassword : "",
        password : "",
        confirmpassword : "",
      },
      validationSchema: validate,
      onSubmit: async(values) => {
        console.log("onsubmit");
        changePassword(values ).then((resposne)=> {
          if(resposne.data.status) {
            toast.success(resposne.data.message , {
              position:"top-center" ,
            });
          }else{
            toast.error(resposne.data.message , {
              position: "top-center"
            })
          }
        }) 
        .catch((resposne) => {
          toast.error(resposne.message , {
            position : "top-center",
          }); 
        })
      
      }
    })

    const handleChange = (event) => {
      formik.setValues((prev) => {
        const formFields = {...prev} ;
        formFields[event.target.name] = event.target.value ;
        return formFields 
      })
    }


  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center mx-auto w-full lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg ">

          <h2 className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0  sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 "> 
            Change Password
          </h2>

          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 " onSubmit={formik.handleSubmit} >
            <div>
              <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Old Password </label>
              <input  type="password" name="oldpassword" id="oldpassword"  placeholder="Old Password"  className="bg-gray-50 border border-gray-300 text-grey-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               onChange={(e) => { handleChange(e) }}/>

               {formik.touched.oldpassword && formik.errors.oldpassword ? (
                <div>{formik.errors.oldpassword}</div>
               ) : null}
             </div>

              <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type="password" name="password" id="password" placeholder="New Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => { handleChange(e) }}
              />
              {formik.touched.password && formik.errors.password ? (
              <div className='text-red-500' >{formik.errors.password}</div>
                ) : null}
              
              </div>
              <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" name="confirmpassword" id="confirm-password" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => { handleChange(e) }}
              />

              {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <div className='text-red-500' >{formik.errors.confirmpassword}</div>
               ) : null}

              </div>

              <button type="submit" className="w-full mt-8 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>

          </form>

        </div>

      </div>

    </div>
  )

}

export default ChangePassword 