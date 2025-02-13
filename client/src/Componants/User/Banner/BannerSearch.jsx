import React from 'react';
import './BannerSearch.scss';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';

function BannerWithSearch() {
    const navigate=useNavigate();
    return (
        <div className=' homepage-banner grid grid-cols-3 md:grid-cols-3 ' style={{ backgroundImage: "url(/images/Edit-Banner.jpg" }}>
            <div className='col-span-2 h- flex flex-col justify-center m-5 md:ml-14'>
                <div className='mt-5'>
                    <h2 className="search-banner-title font-black text-md md:text-3xl md:mb-10 tracking- md:tracking-wider pr-9  ">
                    The Premier Platform <br />
                    to Showcase Your Skills

                    </h2>
                </div>
                <div className='mb-10 hidden md:block tracking-wide'>
                    <p className='text-xs md:text-md  leading-4 md:leading-6'>Learn the skills you need to take the next step and every step <br />
                        after. Log in now to save on courses through March 1.</p>
                </div>
                <div onClick={() => { navigate('/courses')}} className='mb-10 flex'>
                    <Button >
                        Explore courses
                    </Button>
                </div>
            </div>


            {/* <div className='col-span-1 flex justify-center items-center'>
                <div className="max-w-md mx-auto hidden lg:inline-block">
                    <div className=" banner-serach-bar relative flex items-center  h-14 border-white rounded-full focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                       <Link to={'/search'}>
                            <input style={{ '--tw-ring-color': '#fff' }} readOnly className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 focus:border-white border-white" type="text" id="search" placeholder="Search Course.." />
                       </Link>
                    </div>
                </div>

            </div> */}


        </div>
        

    )
}

export default BannerWithSearch  