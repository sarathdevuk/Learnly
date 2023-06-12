import React ,{useState , useEffect} from 'react'
import { Navigate , Outlet , useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import  { setUserDetails } from '../Redux/Features/userSlice'
import {authUser} from '../services/userApi'
import { authAdmin } from '../services/adminApi';
import { authTutor } from '../services/tutorApi';

function PrivateRoutes( {role , route}) {

  let [auth , setAuth] = useState(null) ;
  const navigate = useNavigate()
  const dispatch = useDispatch({})


  useEffect (()=> {
    if(role === 'user') {
      authUser().then((response) => {
        if(response.data.status == false) {
          localStorage.removeItem('JwtToken')
          dispatch(
            setUserDetails({})
          )

          setAuth(response.data.status)
        }
        setAuth(response.data?.status)

      }).catch((response) => {
        toast.error(response.message , {
          position :"top-center"
        })
        setAuth(response.data?.status)
        navigate('/')
      })
    }else if ( role === 'admin') {
        authAdmin().then((response) => {
          setAuth(response.data.status)
        }).catch((response) => {
          toast.error(response.message , { position :"top-center" })
          setAuth(response.data?.status)
          navigate('/');
        })
    }else if(role === 'tutor') {
      authTutor().then((response) => {
        setAuth(response.data.status)
      }).catch((response) => {
        toast.error(response.message , { position: "top-center"})
        setAuth(response.data.status)
        navigate('/') ;
      })
    }
  },[])

  if( auth == null) return 

  return (
    auth ? <Outlet/> : <Navigate to={route} />
  )
}

export default PrivateRoutes