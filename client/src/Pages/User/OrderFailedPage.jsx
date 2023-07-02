import React from 'react'
import UserHeader from '../../Componants/User/UserHeader/UserHeader'
import OrderFailed from '../../Componants/User/OrderFailed/OrderFailed'
import Footer from '../../Componants/User/Footer/Footer'

function OrderFailedPage() {
  return (
    <div>
      <UserHeader/>
      <OrderFailed/>
      <Footer/>
    </div>
  )
}

export default OrderFailedPage