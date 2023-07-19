import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {toast , ToastContainer } from "react-toastify" ;
import { getCourseFullDetails } from "../../../services/userApi";
import { replayQuestion } from "../../../services/tutorApi";

function ReplayQuestion() {

  const { courseId } = useParams();
  const [answer, setAnswer] = useState("");
  const [courseObj , setCourseObj] = useState({})
 
  const [replayIndex, setReplayIndex] = useState(-1);

  const chapterIndex = replayIndex?.chapterIndex ;
  const questionIndex = replayIndex?.questionIndex;

  const validForm = () => {
    if (answer.trim() === "") {
      return false;
    }
    return true;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await replayQuestion(courseId , replayIndex , answer )
     
      if (data.status) {
     
       toast.success("Replayed to question", { position: "bottom-left", toastId: "success"}); 
       setCourseObj((prevCourseObj) => {
        const updatedCourse = { ...prevCourseObj };
        updatedCourse.course[chapterIndex].questionsAndAnswers[questionIndex].answer = answer;
        return updatedCourse;
      }); 

      } else {
        toast.error("Something Went Wrong", {
          position: "top-center",
          toastId: "error",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", {
        position: "top-center",
        toastId: "error",
      });
    }
  }; 

  useEffect(()=> {
    getCourseFullDetails(courseId).then((response) => {
          setCourseObj(response.data.courseDetails) 
  
    })  

  },[])



  return (
    <div>
      <div className="m-4 text-2xl font-semibold">
        {/* <h1> Replay Questions</h1> */}
      </div>

      <div className="relative bg-white border overflow-x-auto shadow-md sm:rounded-lg p-5 md:mr-6 ">
        {/* <div className="flex items-center justify-between pb-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </div> */}


        <div className="Q&A p-5 w-full">
      <div className="flex justify-between ">
        <h3 className="text-2xl text-gray-800 mt-2 font-semibold mb-4 ">
          Questions and Answers
        </h3>
        {/* You can open the modal using ID.showModal() method */}
       
        <dialog id="my_modal_3" className="modal flex items-center justify-center">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-2">
              {" "}
              Replay For the Question
              {/* {index + 1}{" "} */}
            </h3>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Ask Question"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {" "}
            </textarea>

            <div className="flex  w-full justify-end">
              <button
                onClick={handleSubmit}
                type="button"
                className=" form-btn mt-2 font-medium rounded  "
                disabled={!validForm()}
              >
                <span className="txt">Submit</span>
              </button>
            </div>
          </form>
        <ToastContainer/>

        </dialog>
      </div> 
        

      {/* <blockquote className="rounded-lg bg-gray-100 p-4">
      <h4 className="font-bold text-lg mb-2"> Chapter 1</h4> 



       <div className="flex justify-between">
       <p className=" text-lg font-semibold text-gray-700">
          Qn1. What is JavaScript
        </p> 

        <button className="btn btn-sm  font-bold  rounded-md hover:bg-violet-700 hover:text-slate-100   " onClick={() => window.my_modal_3.showModal()}>
         Replay  </button>
        </div> 

        <p className="text-gray-950  mx-2 mb-4">
          JavaScript is a single threaded synchronising programming language
        </p>
      
      </blockquote> */}

    { courseObj.course  &&   courseObj?.course.map((chapter, chapterIndex) => (
        <blockquote key={chapterIndex} className="rounded-lg bg-gray-100 p-4">
          <h4 className="font-bold text-lg mb-2">Chapter {chapterIndex + 1}</h4>

          {chapter.questionsAndAnswers.map((qa, qaIndex) => (
            <div>
            <div key={qaIndex} className="flex justify-between">
              <p className="text-lg font-semibold text-gray-700">
                Qn{qaIndex + 1}. {qa.question}
              </p>
              <button
                className="btn btn-sm font-bold rounded-md hover:bg-violet-700 hover:text-slate-100"
                
                onClick={() => {
                  setReplayIndex({ chapterIndex: chapterIndex, questionIndex: qaIndex , questionId:qa._id });
                  window.my_modal_3.showModal();

                }}
              >
                Reply
              </button>
                </div>
          <p className="text-gray-950 mx-2 mb-4">
            {chapter.questionsAndAnswers[qaIndex]?.answer} 
          </p>
            </div>
          ))}
        </blockquote>
      ))}
 
    </div>






      </div>
    </div>
  );
}

export default ReplayQuestion;
