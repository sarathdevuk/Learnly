import React from "react";
import UserHeader from "../../Componants/User/UserHeader/UserHeader";
import CommunitySidebar from "../../Componants/User/Community/CommunitySidebar";
import CommunityNavigation from "../../Componants/User/Community/CommunityNavigation";
import Messenger from "../../Componants/User/Messenger/Messenger";

function MessengerPage() {
  return (
    <React.Fragment>
      <UserHeader />
      <div className="flex h-screen">
        <div className="sticky top-0 self-start">
          <CommunitySidebar />
        </div>
        <Messenger />
      </div>
      <CommunityNavigation />
    </React.Fragment>
  );
}

export default MessengerPage;
