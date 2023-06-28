import React, {useState} from "react";
import UserProfile from "../../Componants/User/UserProfile/UserProfile";
import Settings from "../../Componants/Settings/Settings";
import UserHeader from "../../Componants/User/UserHeader/UserHeader";

function AccountPage() {

  const[activeTab , setActiveTab] = useState('profile')

  const loadTab = () => {
    switch(activeTab) {
      case "profile" :
        return <UserProfile/> ;
      case "settings" :
        return <Settings />;   
      default : 
      null ;
    }


  }



  return (
    <>
      <UserHeader />
      <div className="bg-gray-100 lg:px-24">
        <div className=' p-5  mx-auto'>
          <ul className=" text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full">
              <a onClick={() => { setActiveTab('profile') }} className={activeTab == 'profile' ? "inline-block w-full p-4 text-gray-900 bg-violet-50 rounded-l-lg dark:bg-gray-700 dark:text-white" : "bg-white inline-block w-full p-4 text-gray-900 rounded-l-lg dark:bg-gray-700 dark:text-white"} aria-current="page">Profile</a>
            </li>
            <li className="w-full">
              <a onClick={() => { setActiveTab('settings') }} className={activeTab == 'settings' ? "inline-block w-full p-4 text-gray-900 bg-violet-100 rounded-l-lg dark:bg-gray-700 dark:text-white" : "bg-white inline-block w-full p-4 text-gray-900 rounded-l-lg dark:bg-gray-700 dark:text-white"} >Settings</a>
            </li>
          </ul>
        </div>

        <div className=" mx-auto my-5 p-5">
          {loadTab()}
        </div>
      </div>
      {/* footer /> */}
    </>
  );
}

export default AccountPage;
