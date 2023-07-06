
import NumberCard from '../../Componants/Dashboard/NumberCard'
import Header from '../../Componants/Header/AdminHeader'
import Sidebar from '../../Componants/Sidebar/Sidebar'
// import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroup } from "react-icons/md";

function TutorDashboard() {
  return (
    <div className='relative'>
      <Header role={'tutor'}  /> 
      <Sidebar tutor={true}  /> 
      <div className='admin-page p-3' > 
          <main className='p-6 sm:p-10 space-y-6'>
            <div className='flex flex-col  md:space-y-0 md:flex-row justify-between'>
                <div className='mr-6'>
                  <h1 className='text-3xl font-medium mb-2'>Dashboard </h1>
                </div>
            </div>

              <section className=' grid md:grid-cols-2 xl:grid-cols-4 gap-6' >

              <NumberCard icon={<MdGroup />} data={10} color={"text-purple-600 bg-purple-100"} title={'Students'} />
              <NumberCard icon={<MdGroup />} data={10} color={"text-purple-600 bg-purple-100"} title={'Students'} />
              <NumberCard icon={<MdGroup />} data={10} color={"text-purple-600 bg-purple-100"} title={'Students'} />
              <NumberCard icon={<MdGroup />} data={10} color={"text-purple-600 bg-purple-100"} title={'Students'} />


              </section>


          </main>
      </div>



    </div>
  )
}

export default TutorDashboard