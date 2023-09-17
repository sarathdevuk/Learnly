import React from 'react'
import UserHeader from '../../Componants/User/UserHeader/UserHeader' 
import CommunitySidebar from '../../Componants/User/Community/CommunitySidebar'

function CommunityHomePage() {
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