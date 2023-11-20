import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import './App.css'
import UserHome from './pages/user/UserHome'
import UserLogin from './pages/user/UserLogin'
import UserRegister from './pages/user/UserRegister'
import UserOtp from './pages/user/UserOtp'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashBoard from './pages/admin/adminDashBoard'
import PartnerDashboard from './pages/partner/PartnerDashboard'
import PartnerLogin from './pages/partner/PartnerLogin'
import PartnerRegister from './pages/partner/PartnerRegister'
import PartnerOtp from './pages/partner/PartnerOtp'
import AdminLocation from './pages/admin/AdminLocation'
import AdminUserList from './pages/admin/AdminUserList'
import UserProfile from './pages/user/UserProfile'
import AdminPartnerList from './pages/admin/AdminPartnerList'
import AdminVehicle from './pages/admin/AdminVehicle'
import PartnerProfile from './pages/partner/PartnerProfile'
import UserForgetOtp from './pages/user/UserForgetOtp'
import UserNewPassword from './pages/user/UserNewPassword'
import UserVehicleDetail from './pages/user/UserVehicleDetail'
import AdminCoupon from './pages/admin/AdminCoupon'
import PartnerBookings from './pages/partner/PartnerBookings'
import UserBooking from './pages/user/UserBooking'
import AdminBooking from './pages/admin/AdminBooking'
import PartnerOrderManage from './pages/partner/PartnerOrderManage'
import BookingCompletion from './pages/user/BookingCompletion'
import NotFound from './pages/user/NotFound'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Routes>
   
    <Route path='/admin' element={<AdminDashBoard/>}/>
    <Route path='/admin/signin' element={<AdminLogin/>}/>
    <Route path='/admin/location'element={<AdminLocation/>}/>
    <Route path='/admin/userList'element={<AdminUserList/>}/>
    <Route path='/admin/partnerList'element={<AdminPartnerList/>}/>
    <Route path='/admin/vehicle'element={<AdminVehicle/>}/>
    <Route path='/admin/coupon'element={<AdminCoupon/>}/>
    <Route path='/admin/booking'element={<AdminBooking/>}/>


    <Route path='/partner' element={<PartnerDashboard/>}/>
    <Route path='/partner/signin' element={<PartnerLogin/>}/>
    <Route path='/partner/signup' element={<PartnerRegister/>}/>
    <Route path='/partner/otp' element={<PartnerOtp/>}/>
    <Route path='/partner/profile' element={<PartnerProfile/>}/>
    <Route path='/partner/bookings' element={<PartnerBookings/>}/>
    <Route path='/partner/orderManage' element={<PartnerOrderManage/>}/>
    


      <Route path='/' element={<UserHome />} />
      <Route path='/vehicleDetail/:id' element={<UserVehicleDetail/>} />
      <Route path='/signin' element={<UserLogin/>}/>
      <Route path='/signup' element={<UserRegister/>}/>
      <Route path='/otp' element={<UserOtp/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='/forgotOtp' element={<UserForgetOtp/>}/>
      <Route path='/newPassword' element={<UserNewPassword/>}/>
      <Route path='/userBooking' element={<UserBooking/>}/>
      <Route path='/bookingCompletion' element={<BookingCompletion/>}/>
      <Route path='*' element={<NotFound/>} />

      {/* <Route path=''element={<UserPrivateRoute/>}/> */}
   </Routes>
   </>
  )
}

export default App
