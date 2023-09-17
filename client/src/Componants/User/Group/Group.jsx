import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { getAllGroups } from '../../../services/userApi';


function Group({ isTab }) {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getAllGroups().then((response) => {
      setGroups(response.data.group)
    })
  }, [])



  return (
    <div
      className={`w-full ${isTab ? "px-2 py-0" : "border-x px-5 py-3 sm:px-8"
        } border-base-300 `}
    >
      {groups.length > 0 ?
        <>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-xl font-bold sm:text-2xl'>Groups</h1>

          </div>
          <div className="mt-3 pb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups && groups.map((group) => (
              <Card key={group.id} group={group} />
            ))}
          </div>
        </>
        :
        <div className='lg:h-screen mt-20 lg:mt-0 flex flex-col p-8 justify-center items-center'>
          <img className='w-96 object-cover' src="/images/groupbg.png" alt="" />
          <p>No Group Found</p>
        </div>
      }
    </div>
  )
}

export default Group