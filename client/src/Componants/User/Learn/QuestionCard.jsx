import React from 'react'

function QuestionCard() {
  return (
     <div className="Q&A p-5 w-full">
            <h3 className="text-2xl  mt-8 font-semibold mb-4 ">
              Question And Answers
            </h3>
            <blockquote className="rounded-lg bg-gray-100 p-6">
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
  )
}

export default QuestionCard