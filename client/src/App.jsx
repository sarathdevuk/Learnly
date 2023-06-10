import {BrowserRouter  , Route, Routes } from 'react-router-dom' ;
import './App.css' ;
import UserRouter from './routes/UserRouter';
import TutorRouter from './routes/TutorRouter';
import AdminRouter from './routes/AdminRouter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer , toast } from 'react-toastify';


function App() {


  return (
      <BrowserRouter>
      <Routes>
        
        {/* User Router */}
         <Route path={'/*'} element={ <UserRouter/> } />

        {/* Admin Router */}
         <Route path={'/admin/*'} element={ <AdminRouter/>} />

        {/* Tutor Routes */}
        <Route path={'/tutor/*'} element={<TutorRouter/>} /> 

      </Routes>
      <ToastContainer/>
      </BrowserRouter>
     
  )
}

export default App
