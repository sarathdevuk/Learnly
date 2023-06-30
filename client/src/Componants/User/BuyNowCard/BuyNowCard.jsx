import React , {useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useSelector } from 'react-redux'


function BuyNowCard({courseDetails}) {
  const user = useSelector((state) => state.user);
  const [isEnrolled , setIsEnrolled] = useState(false)
    useEffect(() => {
      if(user.firstName ) {
        isCourseEnrolled(courseDetails._id).then((response) => {
          if(response.data.enrolled) {
            setIsEnrolled(true)
          }
        })
      }
    })


  return (
    <div className="max-w-sm mt-8 bg-white border border-gray-200 rounded-lg w-full md:w-80 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='p-5'>
                <img className="rounded w-full object-cover" src={import.meta.env.VITE_SERVER_URL +courseDetails.image.path} alt />
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">₹ {courseDetails.price}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">life long validity</p>
                <div className='button'>
                    {isEnrolled ?
                        <Link to={`/my-enrollments`}>
                            <Button width={true}>
                                Continue Learning
                            </Button>
       
                        </Link>
                        :
                        <Link className='w-full' to={`/course-payment/${courseDetails._id}`}>
                            <Button width={true}>
                                Buy Now
                            </Button>
                        </Link>
                    }
                </div>
            </div>
            <div className='border-t pl-5 mt-4 mb-4'>
                <h4 className='font-semibold mt-3'>Whats included</h4>
                <p className='mt-3'>{courseDetails.course && courseDetails.course.length} Chapter </p>
                <p className='mt-3'>Online accessibility</p>
            </div>
        </div>
  )
}

export default BuyNowCard