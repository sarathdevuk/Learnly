import React, { useEffect, useState } from 'react'
import { getMembersDetails } from '../../../services/userApi';
import Loader from '../Loader/Loader';

function Members({ community }) {
    const [members, setMembers] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMembersDetails(community._id).then((response) => {
            console.log(response);
            setMembers(response.data.community);
            setLoading(false)
        })
    }, [])
    
    return (
        <div className="p-5 bg-white shadow rounded-md">
            {loading ? <Loader /> :
                <>
                    <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row ml-8">
                        <img src={members ? members.admin.picture : ""} alt="" className="object-cover self-center flex-shrink-0 w-32 h-32 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
                        <div className="flex flex-col items-center md:items-start justify-center">
                            <h1 className="text-4xl font-medium text-gray-700">{members ? `${members.admin.firstName}  ${members.admin.lastName}` : ""}</h1>
                            <p className="dark:text-gray-400">Admin</p>
                        </div>
                    </div>

                    <div classname="flex flex-col ">
                        <div className="p-4 mt-5 bg-white rounded-lg   sm:p-8 ">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Community members</h3>
                                
                            </div>
                            <div className="grid grid-col md:grid-cols-3 gap-5 mt-6">
                                {members && members.members.map((members, index) => {
                                    return (
                                        <div key={index} className="flex items-center space-x-4 p-3 bg-slate-100  rounded-md">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full object-cover" src={members.picture} alt="User Pic" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {members.firstName} {members.lastName}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>}
        </div>


    )
}

export default Members