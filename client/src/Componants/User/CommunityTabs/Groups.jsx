import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserDetails, joinGroup } from '../../../services/userApi';
import { toast } from 'react-toastify' ;
import { fetchAllJoinedGroups } from '../../../Redux/Actions/groupActions';
import CardLoading from '../CardLoading/CardLoading';

function Groups({ community , loadCommunityGroups , groups , groupLoading }) {

  const dispatch = useDispatch();
  const [joinedGroups , setJoinedGroups] = useState() ;


  // join groups
  const handleJoinGroup = (communityId , groupId) => {
    joinGroup(communityId , groupId ).then((response) => {

      if(response.data.status){
        console.log("vertheeweeeeeeeeeeeeeeeeeeeeeeeeeee", response.data )
        toast.success(response.data.message , {
          position:"top-center"
        })
        dispatch(fetchAllJoinedGroups())
        setJoinedGroups([...joinedGroups, groupId ])
      }
    }).catch((err) => {
      toast.error("Cant join" , {position:"top-center"})
    })
  }

  // loading initial data
  useEffect(() => {
    loadCommunityGroups() 

    // loading user groups
    getUserDetails()
    .then((response) => {
      setJoinedGroups(response.data.userDetails.group)
    })

  },[])

  return (
      <>
        {groupLoading ? 
        <CardLoading/> 
        :
         <>
        {groups.length > 0 ?
          
          <div className='grid grid-cols sm:grid-cols-2 lg:grid-cols-3  gap-4'>
          {groups && groups.map((group) => {
              return (
                  <div className="flex justify-center">
                      <div className="block w-full rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                          <a className='w-full' data-te-ripple-init data-te-ripple-color="light">
                              <img className="h-[180px] w-full rounded-t-lg object-cover" src={import.meta.env.VITE_SERVER_URL + group.image.path} alt />
                          </a>
                          <div className="p-6 flex justify-between">
                              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                  {group.name}
                              </h5>
                              {joinedGroups && joinedGroups.includes(group._id)?
                              ""
                              :
                                  <div className="mr-3 cursor-pointer">
                                      <h2 className="font-bold"
                                          onClick={() => { handleJoinGroup(community._id, group._id) }}
                                      >Join</h2>
                                  </div>

                              }
                          </div>
                      </div>
                  </div>
              )
          })
          }
      </div>
        : 
        <div className='flex flex-col p-8 justify-center items-center'>
        <img className='w-96 object-cover' src="/images/groupbg.png" alt="" />
        <p>No Group Found</p>
    </div>
        
        }
         
         </>
        }

      </>
  )
}

export default Groups