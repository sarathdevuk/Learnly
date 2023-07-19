import React, { useEffect, useState } from "react";
import Header from "../../Componants/Header/AdminHeader";
import Sidebar from "../../Componants/Sidebar/Sidebar";
import CourseCard from "../../Componants/User/CourseCard/CourseCard";
import { getCourse } from "../../services/tutorApi";

function ViewQuestionsPage() {
  const [obj, setObj] = useState({});

  useEffect(() => {
    getCourse().then((response) => {
      setObj(response.data);
    });
  }, []);

  console.log(obj.course, "@#$%^&* Clourse");
  return (
    <div className="relative"> 
      <Sidebar tutor={true} />
      <Header role={"tutor"} />

      <div className="admin-page p-3">
        <div className=" mt-10 mx-4  grid-cols-1 gap-20 sm:grid-cols-2 grid md:grid-cols-3 xl:grid-cols-3 ">
          {obj?.course?.map((course) => {
            return <CourseCard key={course._id} course={course} path={"/tutor/questions/replay"} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewQuestionsPage;
