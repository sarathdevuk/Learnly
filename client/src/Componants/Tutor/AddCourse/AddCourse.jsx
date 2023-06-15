import React from 'react'

function AddCourse() {
  return (
    <div className='form-wrap w-3/3 mr-md-4 mt-7'>
    <div className='mb-4 pb-4 form-title-box ' >
        <span className='text-base font-semibold text-violet-700'>Add Course</span>
    </div>
    <div className='mt-10'>
                    <div className='flex items-center justify-center w-full ' >
                        <img class="h-auto max-w-lg rounded-lg w-full course-image"  alt="image description"></img>
                </div>
           

                <div>
                    <div class= "flex items-center justify-center w-full" >
                            <div className='w-full lg:w-1/3  md:w-1/2 sm:w-1/1'>
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p>Course thumbnail</p>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                    <input id="dropzone-file"  type="file" className="hidden" required
                                    
                                  
                                />
                            </label>
                        </div>
                    </div>
                </div>

            </div>

    </div>
  )
}

export default AddCourse