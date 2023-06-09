import React , {useState} from "react";
import LoadingButton from "../../User/LoadingButton/LoadingButton";
import { ToastContainer ,  toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup' ;
import { addTutor } from "../../../services/adminApi";



function AddTutor() {

  const validate = Yup.object({
    firstName : Yup.string()
    .max(15, 'Must be 15 charecters or less')
    .required('First Name is Required'),
    lastName : Yup.string()
    .max(15, 'Must be 15 charecters or less')
    .required('Last Name is Required'),
    email : Yup.string()
    .email('Invalid email Address')
    .required('Email is required '),
    phone : Yup.string()
    .max(10 ,"Please enter a Valid Phone Number")
    .min(10 , "Please Enter a valid phone Number") 
    .required("Phone Number is required"),
    place : Yup.string()
    .max(15 , 'Must be 15 charecters or less')
    .required('Place is Required')

  })


  const [loading , setLoading] = useState(false) ;


  const generateError = (error) =>{
    toast.error(err , {
      position : "top-center"
    })
  }

  const successMessage = (message) => {
    toast.success(message , {
      position : "top-center"
    } )
  }

  const formik = useFormik({
    initialValues: {
      firstName : "",
      lastName : "" ,
      email : "",
      phone : "",
      place: "",

    },
    validationSchema : validate ,
    onSubmit : async(values) =>{
      console.log("onSubmit");
      setLoading(!loading) ;
      const{ data } = await addTutor(values) ;

      setLoading(false) 

      if( data.created ) {
        console.log(data);
        successMessage(data.message)
      }else {
        console.log(data);
        generateError(data.message)
      }
    }

  })

  const handleChange = (e) => {
    formik.setValues((prev) =>{
       const formFields = {...prev}
       formFields[e.target.name] =e.target.value ;
       return formFields ; 
      
      })
  }


  return (
    <div className="form-wrap w-1/1 m-6 lg:mt-10 ">
      <div className="mb-4 pb-2 form-title-box ">
        <span className="text-xl font-semibold text-violet-700">
          Add Tutor
        </span>
      </div>
      <form>
      <div className="space-y-12">
    
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Tutor Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600"></p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  onChange={(e) => {handleChange(e)}}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {formik.touched.firstName && formik.errors.firstName ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.firstName}</p>
                        ) : null}


              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  onChange={(e) => { handleChange(e) }}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {formik.touched.lastName && formik.errors.lastName ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.lastName}</p>
                        ) : null}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) =>{ handleChange (e)}}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                        ) : null}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  onChange={(e) => { handleChange(e) }}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {formik.touched.phone && formik.errors.phone ? (
                 <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
                  ) : null}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 ">
                Password
              </label>
              <div className="mt-2">
                <input
                  readOnly
                  type="text"
                  name="Password"
                  id="last-name"
                  placeholder="Password will sent to Email"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

 

            <div className="sm:col-span-3 ">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Place
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="place"
                  id="city"
                  onChange={(e) => { handleChange(e) }}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.place && formik.errors.place ? (
               <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
               ) : null}

              </div>
            </div>
          </div>
        </div>

      
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
      <LoadingButton onClick={ () => formik.handleSubmit()} loading={loading}>
          Submit
        </LoadingButton>
    
      {/* <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Tutor</button> */}
      </div>
    </form>
    <ToastContainer/>
      
    </div>
  );
}

export default AddTutor;
