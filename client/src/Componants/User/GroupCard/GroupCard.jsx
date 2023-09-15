import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GroupCard = ({ community, joined, handleJoin, joinedStatus }) => {
    const user = useSelector((state) => state.user);

    return (
        <div className="card cursor-pointer card-compact bg-base-100 shadow-lg">
            <Link to={joined ? '/community-home' : ""} state={community} >
                <figure>
                    <img src={`${import.meta.env.VITE_SERVER_URL}${community.image?.path}`} alt="" className="w-full aspect-[2/1] object-cover" />
                </figure>
            </Link>
            <div className="p-3">
                <div className="flex justify-between gap-2 items-center">
                    <div className="flex items-start gap-3">
                        <div className="  text-2xl">
                            <img className="h-12 w-12 mask mask-circle object-cover" src={`${import.meta.env.VITE_SERVER_URL}${community.image.path}`} alt="" />
                        </div>
                        <div>
                            <div
                                className="cursor-pointer truncate text-base font-bold leading-6 hover:text-primary"
                                data-tip={community.name}
                            >
                                {community.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {community.members.length} members
                            </div>
                        </div>
                    </div>
                    {joined ?
                        null
                        :
                        user.email ?
                            <div>
                                {joinedStatus ? ""
                                    :
                                    <div className="mr-3 cursor-pointer">
                                        <h2 className="font-bold"
                                            onClick={() => { handleJoin(community._id) }}
                                        >Join</h2>
                                    </div>}

                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
};

export default GroupCard;
