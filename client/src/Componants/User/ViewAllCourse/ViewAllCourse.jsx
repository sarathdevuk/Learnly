import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import Pagination from "./Pagination";
import Loader from "../Loader/Loader";
import { viewAllCourse } from "../../../services/userApi";
import CourseFilterCard from "../CourseFilterCard/CourseFilterCard";
import { toast } from "react-toastify";

function ViewAllCourse() {
  const [course, setCourse] = useState([]);
  const [loading, setloading] = useState(true);

  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "price", order: "desc" });
  const [filterCategory, setfilterCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const getAllCourse = async () => {
        const { data } = await viewAllCourse(
          page,
          sort,
          filterCategory.toString(),
          search,
          price
        );
        setloading(false);
        setObj(data);
      };

      getAllCourse();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong ", {
        position: "top-center",
        toastId: "error",
      });
    }
  }, [sort, filterCategory, page, search, price]);
  console.log("@#%#@$%$%$#", price);

  return (
    <div className=" md:my-7 mx-11 md:mx-16 mb-14 ">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <div className="flex flex-col justify-between p-2 py-4 mb-4 m-h-screen items-center">
            

              <div className="flex items-center justify-end w-full md:mr-7  ">
              <div className="mr-auto">
                <h1 className="text-xl md:hidden font-bold text-slate-800">
                  {" "}
                  Courses{" "}
                </h1>
              </div>
                <div
                  className="bg-white items-center justify-end  md:justify-between  w-2/3 md:w-1/3 flex rounded-lg max-w-2xl drop-shadow-md p-2 sticky"
                  style={{ top: 5 }}
                >
                  <input
                    
                    onChange={({ currentTarget: input }) =>
                      setSearch(input.value)
                    }
                    className="  rounded-md w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                    type="text"
                    placeholder="Search"
                  />
                  <div
                    // onClick={handleSearch}
                    className="bg-violet-500 p-2 hover:bg-violet-700 cursor-pointer mx-2 rounded-full"
                  >
                    <svg
                      className="w-4 h-4 text-white"
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
                <CourseFilterCard
                  filterCategory={filterCategory}
                  categories={obj?.category ? obj?.category : []}
                  setfilterCategory={(category) => setfilterCategory(category)}
                  setPriceFilter={(price) => setPrice(price)}
                />
              </div>
            </div>
          </div>

          {!obj.course || obj.course.length === 0 ? (
            <div>
            <div className="flex justify-center items-center">
             
              <img
                src="/images/noCourse.svg"
                className="w-1/2 h-1/2"
                alt="No Course"
              />
            </div>
              <p className="text-center text-lg font-semibold "> Course not Found</p>
            </div>
          ) : (
            <div className=" mt-10 md:ml-[15%] grid-cols-1 gap-10 sm:grid-cols-2 grid md:grid-cols-3 xl:grid-cols-4">
              {obj.course.map((course) => (
                <CourseCard key={course._id} course={course} path={"/course"} />
              ))}
            </div>
          )}

          {/* pagination */}
          <Pagination
            page={page}
            limit={obj?.limit ? obj?.limit : 0}
            total={obj?.total ? obj?.total : 0}
            setPage={(page) => setPage(page)}
          />
        </div>
      )}
    </div>
  );
}

export default ViewAllCourse;
