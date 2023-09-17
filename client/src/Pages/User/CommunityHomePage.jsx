import React, { useState } from 'react'
import UserHeader from '../../Componants/User/UserHeader/UserHeader' 
import CommunitySidebar from '../../Componants/User/Community/CommunitySidebar'
import { getCommunityDetails } from '../../../../learnly_backend/Controller/communityController';
import { useLocation } from 'react-router-dom';
import { set } from 'mongoose';

function CommunityHomePage() {
  const {state} = useLocation()// Getting data from the location that was passed from the Community page as state.
  const [community , setCommunitys] = useState();
  const [isAdmin, setIsAdmin] = useState(false)
  const [showEditModal , setShowEditModal] = useState(false)
  const [createGroupModal , setCreateGroupModal] = useState(false)

  const loadCommunityData = () => {
    getCommunityDetails(state._id).then((resonse)=> {
      setCommunitys(resonse.data.communityDetails)
      setIsAdmin(resonse.data.admin)
    })
  }

  return (
    <>
    <UserHeader />
    <div className="flex">
        <div className="sticky top-0 self-start">
            <CommunitySidebar />
        </div>
        <div className="w-full border-x border-base-300">
            <div className="bg-base-100">
 
                

            </div>
        </div>
    </div>
    
</>
  )
}

export default CommunityHomePage