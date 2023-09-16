import React, { useRef } from 'react';
import { BiCloudUpload } from "react-icons/bi";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { createCommunityPost } from '../../services/userApi';


function PostModal({ loadFeeds, closePostModal, communityId }) {
    //image input box 
    const fileInputRef = useRef();
    const handleClick = () => {
        fileInputRef.current.click();
    };

    //form validation 
    const validate = Yup.object({
        message: Yup.string()
            .min(10, 'Message must be at least 10 charaters')
            .required('Message Required'),
    })

    //formik for validation 
    const formik = useFormik({
        initialValues: {
            image: "",
            message: "",
        },
        validationSchema: validate,
        onSubmit: async (values) => {
            createCommunityPost({...values,communityId}).then((response)=>{
                console.log(response);
                if(response.data.status){
                    closePostModal()
                    toast.success(response.data.message, {
                        position: "top-center",
                    })
                    loadFeeds();

                }else{
                    toast.error(response.data.message, {
                        position: "top-center",
                    })
                }
            })
        }
    })

    const handleChange = (e) => {
        formik.setValues((prev) => {
            const formFields = { ...prev };
            if (e.target.name == "image") {
                formFields[e.target.name] = e.target.files[0];
            } else {
                formFields[e.target.name] = e.target.value;
            }
            return formFields;
        })
    }
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-scrool fixed inset-0 z-50 outline-none focus:outline-none" >
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 mt-48 sm:mt-32  lg:mt-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Create New Post
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className='mt-10'>
                                {formik.values.image ?
                                    <div className='flex items-center justify-center w-full cursor-pointer ' >
                                        <img class="h-auto max-w-lg rounded-lg w-full course-image" src={formik.values.image ? URL.createObjectURL(formik.values.image) : ""} alt="image description" onClick={handleClick}></img>
                                    </div>
                                    : ""}
                                <div>
                                    <div class={formik.values.image ? " items-center justify-center w-full hidden" : "flex items-center justify-center w-full"}>
                                        <div className='w-full'>
                                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <BiCloudUpload size={22} />
                                                    <p>Community Image</p>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" name='image' className="hidden" required
                                                    ref={fileInputRef}
                                                    onChange={(e) => { handleChange(e) }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Message */}
                            <div className='flex mt-4'>
                                <div className="relative mb-3 w-full">
                                    <div>
                                        <textarea id="message" rows="4" className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='message' placeholder="What's on your mind ?"
                                            onChange={(e) => { handleChange(e) }}
                                        ></textarea>
                                    </div>
                                    {formik.touched.message && formik.errors.message ? (
                                        <p className="text-red-500 text-xs mt-2">{formik.errors.message}</p>
                                    ) : null}
                                </div>
                            </div>

                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={closePostModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={formik.handleSubmit}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default PostModal