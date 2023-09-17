import React from "react";
import UserHeader from "../../Componants/User/UserHeader/UserHeader";
import CommunitySidebar from "../../Componants/User/Community/CommunitySidebar";
import CommunityNavigation from "../../Componants/User/Community/CommunityNavigation";
import Group from "../../Componants/User/Group/Group";

function GroupPage() {
  return (
    <>
      <UserHeader />
      <div className="flex h-screen">
        <div className="sticky top-0 self-start">
          <CommunitySidebar />
        </div>
        <Group />
      </div>
      <CommunityNavigation />
    </>
  );
}

export default GroupPage;
