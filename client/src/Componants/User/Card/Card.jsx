import React from 'react'
import { Link } from 'react-router-dom';

function Card({ key , group }) {

  return (
      <div key={key} className="card cursor-pointer card-compact bg-base-100 shadow-lg">
          <Link to={'/community-home'} state={{_id:group.community}}>
              <figure>
                  <img src={`${import.meta.env.VITE_SERVER_URL}${group.image.path}`} alt="" className="w-full aspect-[2/1] object-cover" />
              </figure>
          </Link>
          <div className="p-3">
              <div className="flex justify-between gap-2 items-center">
                  <div className="flex items-start gap-3">
                      <div className="  text-2xl">
                          <img className="h-12 w-12 mask mask-circle object-cover" src={`${import.meta.env.VITE_SERVER_URL}${group.image.path}`} alt="" />
                      </div>
                      <div>
                          <div
                              className="cursor-pointer truncate text-base font-bold leading-6 hover:text-primary"
                              data-tip={group.name}
                          >
                              {group.name}
                          </div>
                          <div className="text-xs text-gray-500">
                              {group.members.length} members
                          </div>
                      </div>
                  </div>
                 
              </div>
          </div>
      </div>
  )
}

export default Card