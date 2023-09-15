import React from "react";
import UserHeader from "../../Componants/User/UserHeader/UserHeader";
import CommunitySidebar from "../../Componants/User/Community/CommunitySidebar";
import CommunityNavigation from "../../Componants/User/Community/CommunityNavigation";
import Community from "../../Componants/User/Community/Community";

function CommunityPage() {
  return (
    <>
      <UserHeader />
      <div className="flex h-screen bg-blue-100">
        <div className="sticky top-0 self-start bg-red-200">
          <CommunitySidebar />
        </div>
        <Community />
      </div>

      <CommunityNavigation />
    </>
  );
}

export default CommunityPage;
