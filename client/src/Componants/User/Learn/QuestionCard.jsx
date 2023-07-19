import React, { useState } from "react";
import { AskQuestion } from "../../../services/userApi";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

function QuestionCard({ index }) {
  const { courseId } = useParams();
  const [question, setQuestion] = useState("");

  const validForm = () => {
    if (question.trim() === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AskQuestion(courseId, question, index);
      if (data.status) {
        toast.success("New Question Added", {
          position: "bottom-left",
          toastId: "success",
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

  return (
    <div className="Q&A p-5 w-full">
      <div className="flex justify-between ">
        <h3 className="text-2xl text-gray-800 mt-2 font-semibold mb-4 ">
          Questions and Answers
        </h3>
        {/* You can open the modal using ID.showModal() method */}
        <button className="btn" onClick={() => window.my_modal_3.showModal()}>
          Ask Question
        </button>
        <dialog id="my_modal_3" className="modal flex items-center justify-center">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-2">
              {" "}
              Enter Your Doubts For Chapter {index + 1}{" "}
            </h3>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Ask Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
      <blockquote className="rounded-lg bg-gray-100 p-4">
        <p className=" text-lg font-semibold text-gray-700">
          Qn1. What is JavaScript
        </p>

        <p className="text-gray-950  mx-2 mb-4">
          JavaScript is a single threaded synchronising programming language
        </p>
        <p className=" text-lg font-semibold text-gray-700">
          Qn1. What is JavaScript
        </p>

        <p className="  text-gray-950  mx-2">
          JavaScript is a single threaded synchronising programming language
        </p>
      </blockquote>
    </div>
  );
}

export default QuestionCard;
