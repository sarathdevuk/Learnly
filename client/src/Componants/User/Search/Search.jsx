import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { searchCourse } from "../../../services/userApi";
import { toast } from "react-toastify";

function Search() {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState();
  const inputRef = useRef();
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    try {
      if(query != "") {
        searchCourse(query).then((response) => {
          setCourse( response.data.result)
        }).catch((err)=> {
          console.log(err);
          toast.error("Something went wrong" , { position: "top-center" , toastId: "Error"})
        })
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong" , { position: "top-center" , toastId: "Error"})
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <div className="flex flex-col p-2 py-6 mb-6 m-h-screen items-center">
        <div
          className="bg-white items-center justify-between w-full flex rounded-full max-w-2xl drop-shadow-2xl p-2 mb-5 sticky"
          style={{ top: 5 }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="  rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
            type="text"
            placeholder="Search"
          />
          <div
            onClick={handleSearch}
            className="bg-violet-500 p-2 hover:bg-violet-700 cursor-pointer mx-2 rounded-full"
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {course ? (
        <div className="mx-3 lg:mx-20 mb-8">
          <h3 className="ml-5 text-2xl md:text-3xl">
            {course ? course.length : " "} results for “{query}”
          </h3>
        </div>
      ) : (
        <div className="mx-3 lg:mx-20 mb-8 text-center">
          <h3 className="ml-5 text-2xl md:text-3xl">
            Search what do you want to learn
          </h3>
        </div>
      )}
     {course && course.length ? course.map((obj, index) => {
                return (
                    <Link to={`/course-details/${obj._id}`}>
                        <div key={index} className='mx-3 lg:mx-20 mb-10'>
                            <div className="flex justify-center mt-4 sm:mx-10 m-3">
                                <div className="flex p-4 w-full max-w-screen-lg hover:bg-violet-50 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="rounded-md mt-4 sm:mt-0 w-56 h-32 object-cover" src={import.meta.env.VITE_SERVER_URL + obj.image.path} />
                                    <div className="flex flex-col ml-0 sm:ml-3 justify-between mt-2 sm:0 p-4 leading-normal">
                                        <h5 className="mb-2 text-xl  font-bold tracking-tight text-gray-900 dark:text-white">{obj.name}</h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{obj.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
                :
                <div className='flex justify-center items-center'>
                    <img src="/images/noCourse.svg" className="w-1/2 h-1/2" alt="No Course" />
                </div>
            }



    </div>
  );
}

export default Search;
