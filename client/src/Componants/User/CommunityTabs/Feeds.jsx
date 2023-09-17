import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PostModal from '../Modal/PostModal';
import { getFeeds } from '../../../services/userApi';
import Loader from '../Loader/Loader';



function Feeds({ community, admin }) {
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [showFeedModal, setShowFeedModal] = useState(false);

    //geting community feeds api
    const loadFeeds=()=>{
        getFeeds(community?._id)
        .then((response) => {
            if (response.data.status) {
                setFeeds(response.data.community.posts);
                setLoading(false)
            } else {
                toast.error(response.data.message, {
                    position: "bottom-center",
                })
            }
        })
        .catch((response=>{
            toast.error(response.response.data.message, {
                position: "top-center",
            });
        }))
    }

    //loading feeds
    useEffect(() => {
       loadFeeds()
    }, [])

    //callback to close post feed modal
    const closePostModal = () => {
        setShowFeedModal(false);
    }
    console.log(feeds);
    return (

        <div className='grid grid-cols gap-4'>

            {admin ?
                <div className='flex justify-center'
                   onClick={() => { setShowFeedModal(true) }}>
                    <div  className='w-full max-w-3xl flex p-5 bg-white shadow rounded-lg cursor-pointer'>
                        <img className="w-10 h-10 rounded-full mr-5 object-cover" src={user.image} alt="Default avatar" />
                        <input type="text" id="first_name" className="bg-gray-100 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg w-full  " placeholder="What's on your mind ?" readOnly disabled />
                    </div>
                </div>
                : ""}

            {loading ?
                <Loader />
                :
                <>
                    {feeds && feeds.map((post, index) => {
                        return (
                            <div key={index} className='w-full flex justify-center'>
                                <div className="px-5 w-full py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-3xl">
                                    <div className="flex mb-4">
                                        <img className="w-12 h-12 rounded-full object-cover" src={post.user && post.user.picture} />
                                        <div className="ml-2 mt-0.5">
                                            <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">{post.user && post.user.firstName}</span>
                                            <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{new Date(post.createdAt).toString().slice(0, 21)}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">{post.message}</p>
                                    {post.image ?
                                        <div className='mt-5'>
                                            <img
                                                src={import.meta.env.VITE_SERVER_URL + post.image.path}
                                                className="h-auto w-full rounded-lg object-cover max-h-96"
                                                alt="" />
                                        </div>

                                        : ""}
                                    <div className="flex justify-between items-center mt-5">
                                        <div className="flex ">
                                            <svg className="p-0.5 h-6 w-6 rounded-full z-20 bg-white dark:bg-gray-800 " xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><defs><linearGradient id="a1" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#18AFFF" /><stop offset="100%" stopColor="#0062DF" /></linearGradient><filter id="c1" width="118.8%" height="118.8%" x="-9.4%" y="-9.4%" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation={1} /><feOffset dy={-1} in="shadowBlurInner1" result="shadowOffsetInner1" /><feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2={-1} k3={1} operator="arithmetic" result="shadowInnerInner1" /><feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0" /></filter><path id="b1" d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z" /></defs><g fill="none"><use fill="url(#a1)" xlinkHref="#b1" /><use fill="black" filter="url(#c1)" xlinkHref="#b1" /><path fill="white" d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z" /></g></svg>
                                            <span className="ml-1 text-gray-500 dark:text-gray-400  font-light">0</span>
                                        </div>
                                        <div className="ml-1 text-gray-500 dark:text-gray-400 font-light">0 comments</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    {showFeedModal ? <PostModal loadFeeds={loadFeeds} closePostModal={closePostModal} communityId={community._id} /> : ""}

                </>
            }



        </div>
    )
}

export default Feeds