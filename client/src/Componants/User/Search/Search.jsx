import React from "react";

function Search() {
  return (
    <div>
      <div className="flex flex-col p-2 py-6 mb-6 m-h-screen items-center">
        <div
          className="bg-white items-center justify-between w-full flex rounded-full max-w-2xl drop-shadow-2xl p-2 mb-5 sticky"
          style={{ top: 5 }}
        >
          <input
            // ref={inputRef}
            // value={query}
            // onChange={(e) => {
            //   setQuery(e.target.value);
            // }}
            className="  rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
            type="text"
            placeholder="Search"
          />
          <div
            // onClick={handleSearch}
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

      < div className='mx-3 lg:mx-20 mb-8 text-center'>
             <h3 className='ml-5 text-2xl md:text-3xl'>Search what do you want to learn</h3>
        </div>

        <div className='flex justify-center items-center'>
                    <img src="/images/noCourse.svg" className="w-1/2 h-1/2" alt="" />
                </div>
    </div>
  );
}

export default Search;
