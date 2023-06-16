import React from "react";

function CourseLIstPage() {
  return (
    <div>
      {/* You can open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_3.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_3" className="modal ">
        <div className="">
        <form
          method="dialog"
          className="modal-box  fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        >
            
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id="exampleModalXlLabel"
            >
              Add Chapter
            </h5>

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>
          <div className='p-7'>
                            <div className='flex  mt-5 '>
                                <div className="relative mb-3 w-full md:w-1/2 m-3" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="chapterName"
                                        name='chapterName'
                                        // value={chapter}
                                        // onChange={(e) => { handleLessonChange(e); setChapter(e.target.value) }}
                                        placeholder="Form control lg" />

                                    {/* {lessonFormik.touched.chapterName && lessonFormik.errors.chapterName ? (
                                        <p className="text-red-500 text-xs ">{lessonFormik.errors.chapterName}</p>
                                    ) : null} */}

                                    <label
                                        htmlFor="chapterName"
                                        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.7rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >Chapter Name
                                    </label>
                                </div>

                            </div>

                            <div className='flex  mt-5 '>
                                <div className="relative mb-3 w-full md:w-1/2 m-3" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="name"
                                        
                                        name='lessonName'
                                        placeholder="Name" />
                                    {/* {lessonFormik.touched.lessonName && lessonFormik.errors.lessonName ? (
                                        <p className="text-red-500 text-xs ">{lessonFormik.errors.lessonName}</p>
                                    ) : null} */}
                                    <label
                                        htmlFor="name"
                                        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.7rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >Lesson Name
                                    </label>
                                </div>
                                <div className="relative mb-3 w-full md:w-1/2 sm:w-1/1 m-3" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        name='videoUrl'
                                        // onChange={(e) => { handleLessonChange(e) }}
                                        // value={lessonFormik.values.videoUrl}
                                        className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="videoUrl"
                                        placeholder="Video Url" />
                                    {/* {lessonFormik.touched.videoUrl && lessonFormik.errors.videoUrl ? (
                                        <p className="text-red-500 text-xs ">{lessonFormik.errors.videoUrl}</p>
                                    ) : null} */}
                                    <label
                                        htmlFor="videoUrl"
                                        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.7rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >Video Link
                                    </label>
                                </div>
                                <div className="relative mb-3 w-full md:w-1/3 m-3" data-te-input-wrapper-init>
                                    <button type="button" className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-400 
                                    dark:hover:bg-green-500 dark:focus:ring-green-500"
                                        // onClick={lessonFormik.handleSubmit}
                                    >Add</button>
                                </div>

                            </div>

                                <div>
                                    <div>
                                        <h1 className='ml-4 mt-3'>Lessons</h1>
                                    </div>

                                    <div className='flex flex-wrap'>
                                 
                                                    <div className='p-3 w-full md:w-1/2'>
                                                        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                                <h5 className=" text-lg font-semibold tracking-tight text-gray-900 dark:text-white"><span className='mr-3'>1.</span>java</h5>

                                                            </div>
                                                        </a>

                                                    </div>
                                          
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2">

                                        <div className='mt-8 w-full  flex justify-end mr-7'>
                                            <button type="button"
                                                className='loading-btn form-btn mt-2 font-medium rounded' >
                                                <span className="txt">
                                                    Submit
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                           
                        </div>

          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </form>
        </div>
      </dialog>
    </div>
  );
}

export default CourseLIstPage;
