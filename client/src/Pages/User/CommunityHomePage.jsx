import React, { useEffect, useState } from 'react'
import UserHeader from '../../Componants/User/UserHeader/UserHeader' 
import CommunitySidebar from '../../Componants/User/Community/CommunitySidebar'
import { useLocation } from 'react-router-dom';
import { getCommunityDetails, getCommunityGroups } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify'
import { fetchAllJoinedGroups } from '../../Redux/Actions/groupActions';
import CreateGroupModal from '../../Componants/User/Modal/CreateGroupModal';
import AddCommunityModal from '../../Componants/User/Community/AddCommunityModal/AddCommunityModal';
import CommunityNavigation from '../../Componants/User/Community/CommunityNavigation';

function CommunityHomePage() {
  const {state} = useLocation()// Getting data from the location that was passed from the Community page as state.
  const dispatch = useDispatch() ;
  const [community , setCommunitys] = useState();
  const [isAdmin, setIsAdmin] = useState(false)
  const [groups , setGroups] = useState();
  const [groupLoading , setGroupLoading] = useState(true);

  const [showEditModal , setShowEditModal] = useState(false)
  const [createGroupModal , setCreateGroupModal] = useState(false)

  const loadCommunityData = () => {
    getCommunityDetails(state._id).then((resonse)=> {
      setCommunitys(resonse.data.communityDetails)
      setIsAdmin(resonse.data.admin)
    })
  }

  // is community details is not there in state details will load from api
  useEffect(()=> {
    loadCommunityData() ;
    // setCommunityState
  },[])

  // loading communityGeoups
  const loadCommunityGroups = () => {
    getCommunityGroups(community._id).then((response)=> {
      if(response.data.status) {
        setGroups(response.data.community.groups);
        setGroupLoading(false)
        dispatch(fetchAllJoinedGroups())
      }else {
        toast.error(response.data.message , {
          position:"bottom-center" 
        })
      }
    }).catch((err)=> {
      toast.error("Cant fetch groups" , {
        position:"bottom-center"
      })
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

    {/* Create Group modal */}
    {createGroupModal ?<CreateGroupModal close={()=> setCreateGroupModal(false)} loadCommunityGroups={loadCommunityGroups} community={community}/> : "" }

    {/*Edit community modal  */} 
    {showEditModal ? <AddCommunityModal close={()=> setShowEditModal(false)} edit={true} community={community} loadCommunityData={loadCommunityData}  /> : ""}

    <CommunityNavigation />
</>
  )
}

export default CommunityHomePage