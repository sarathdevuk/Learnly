import React, { useState, useEffect } from "react";
import "./UserProfile.scss";

import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/Features/userSlice";
import {
  getUserDetails,
  updateUserAvatar,
  updateUserProfile,
} from "../../../services/userApi";

function UserProfile() {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const initialValues = {};

  useEffect(() => {
    // fetch User details from the server
    getUserDetails()
      .then((response) => {
        console.log("userDetails", response.data);
        setUser(response.data.userDetails);
        initialValues.firstName = response.data.userDetails?.firstName;
        initialValues.lastName = response.data.userDetails?.lastName;
      })
      .catch((error) => {
        toast(error.message, { position: "top-center" });
      });

  }, []);

  const vallidate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 Charecter or less")
      .required("FirstName is Required"),

    lastName: Yup.string()
      .max(15, "Must be 15 Charecter or less")
      .required("lastName is Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: vallidate,
    onSubmit: async (values) => {
      console.log("submit valuse", values);
      updateUserProfile(values)
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-center",
          });
          setUser({
            ...user,
            firstName: values.firstName,
            lastName: values.lastName,
          });
        })
        .catch((error) => [
          toast.error(error.message, {
            position: "top-center",
          }),
        ]);
    },
  });

  //handling the input box changes
  const handleChange = (event) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[event.target.name] = event.target.value;
      return formFields;
    });
  };

  const handleFileSelect = (event) => {
    // console.log("handleselect files",event.target.files[0]);
    setImage(event.target.files[0]);

    updateUserAvatar({ image: event.target.files[0] })
      .then((response) => {
        dispatch(
          setUserDetails({
            name: user.firstName,
            id: user._id,
            email: user.email,
            image: URL.createObjectURL(event.target.files[0]),
          })
        );
      })
      .catch((error) => {
        console.log("err" , error);
        toast.error("Image upload failed", {
          position: "top-center",
        });
      });
  };

  // console.log("image"  , image);
  return (
    <div>
      <div className="md:flex  no-wrap md:-mx-2 ">
        {/* Left Side */}
        <div className="w-full md:w-3/12 md:mx-2 rounded-md h-full">
          {/* Profile Card */}
          <div className="bg-white p-3 rounded-md border-t-4 border-green-400">
            <div className="image overflow-hidden relative">
              <img
                className="h-48 w-48 object-cover mx-auto rounded-full"
                src={ !image ?  user?.picture : URL.createObjectURL(image) }
              />
              <div className="ab bg-green-500 text-xs absolute bottom-1 right-4 font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left hover:bg-gray-300 hover:text-gray-600  overflow-hidden cursor-pointer">
                <input
                  type="file"
                  name="photo"
                  className="absolute inset-0  opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                />{" "}
                <FiEdit2 size={14} />
              </div>
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {user?.firstName}
            </h1>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                {user?.status ? (
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                ) : (
                  <span className="ml-auto">
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                      Blocked
                    </span>
                  </span>
                )}
              </li>
            </ul>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Member since</span>
                <span className="ml-auto">
                  {new Date(user?.createdAt).toString().slice(0, 16)}
                </span>
              </li>
            </ul>
          </div>
          <div className="my-4" />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-9/12  ">
          {/* Profile tab */}
          {/* About Section */}
          <div className="bg-white p-3 shadow-sm rounded-md h-full ">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700 p-5">
              <div className="grid md:grid-cols-2 text-sm gap-2">
                <div className="grid ">
                  <div className=" py-2  font-semibold">First Name</div>
                  <input
                    className="mt-2 border-2 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    value={formik.values.firstName}
                    name="firstName"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500 mt-1">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>

                <div className="grid ">
                  <div className=" py-2  font-semibold">Last Name</div>
                  <input
                    className="mt-2 border-2 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    value={formik.values.lastName}
                    name="lastName"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500 mt-1">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>

                <div className="grid mt-4 ">
                  <div className=" py-2  font-semibold">Email</div>
                  <div className="flex justify-between ">
                    <div>{user?.email}</div>
                    <div className="w-8 h-8 text-green-600 border-2 flex justify-center items-center rounded-full border-green-600">
                      <TiTick size={20} />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="grid md:grid-cols-2 mt-8">
                <div className="grid grid-cols-2">
                  <div className=" py-2 font-semibold">No. Groups</div>
                  <div className="md:px-4 py-2">{user?.group.length}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="md:px-4 md:py-2 font-semibold">
                    No. Community
                  </div>
                  <div className="px-4 py-2">{user?.community.length}</div>
                </div>
              </div> */}
              <div className="flex justify-end mt-16">
                <button
                  type="button"
                  className="w-full md:w-32 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => formik.handleSubmit()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
