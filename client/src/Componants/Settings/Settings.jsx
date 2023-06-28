import React from 'react'

function Settings() {
  return (
    <div>
      <div className="text-gray-500 min-h-screen ">
        <div className="container text-gray-500 mx-auto max-w-6xl ">
          <form  >
            <div className="w-full shadow-lg bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
              <div className="w-1/3 bg-white border-r p-8 hidden md:inline-block">
                <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Note</h2>
                <p className="text-xs text-gray-500">We take the security of your account very seriously, and we would like to remind you of the importance of using a strong and unique password. Please make sure that your new password meets the following requirements:</p>
                <ul className='my-4'>
                  <li className='text-xs'> Contains at least 6 characters</li>
                  <li className='text-xs'>Includes both uppercase and lowercase letters</li>
                  <li className='text-xs'>Contains at least one number or special character</li>
                </ul>
                <p className='text-xs text-gray-500'> To change your password, please log in to your account and follow the instructions on the "Change Password" page. If you have any questions or concerns, please do not hesitate to contact our support team.</p>
              </div>
              <div className="md:w-2/3 w-full">
                <div className="py-8 px-16">
                  <label htmlFor="name" className="text-sm text-gray-600">Old Password</label>
                  <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text"  name="password" />
                </div>
                <div className="py-8 px-16">
                  <label htmlFor="email" className="text-sm text-gray-600">New Password</label>
                  <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" name="newPassword"  />
                </div>
                <div className="py-8 px-16">
                  <label htmlFor="email" className="text-sm text-gray-600">Confirm Password</label>
                  <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" name="confirmPassword"  />
                </div>
                
              </div>
            </div>
            <div className="p-16 py-8 bg-white clearfix rounded-b-lg border-t flex justify-end border-gray-200">
              <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Settings