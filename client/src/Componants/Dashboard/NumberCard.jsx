import React from 'react'

function NumberCard({ icon,data,color,title}) {
  return (
      <div className="flex items-center p-8 bg-white  rounded-lg shadow-lg ">
          <div className={`${color} inline-flex flex-shrink-0 items-center justify-center h-16 w-16  rounded-full mr-6`}>
              {icon}
          </div>
          <div>
              <span className="block text-2xl font-bold">{data}</span>
              <span className="block text-gray-500">{title}</span>
          </div>
      </div>
  )
}

export default NumberCard