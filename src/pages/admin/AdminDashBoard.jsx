import React, { useState, useEffect,useRef } from 'react'
import AdminNavBar from '../../components/admin/AdminNavBar'
import AdminChart from './AdminChart'
import AdminChatOne from './AdminChatOne'
// import { functionGetAdminMonthData } from '../../services/Apis';
import {useSelector } from "react-redux";

const AdminDashBoard = () => {

  const  tocken  = useSelector((state) => state.tocken.tocken);

  const [totalAmount,setTotalAmount] = useState()
  const [totalBooking,setTotalBooking] = useState()
  const [monthlyAmount,setMonthlyAmount] = useState()
  const [montlyBooking,setMonthlyBooking] = useState()


  const adminMonthlyData = async()=>{
    // const adminData = await functionGetAdminMonthData(tocken)
    // if(adminData){
    //   setTotalAmount(adminData.data.result.totalAmount)
    //   setTotalBooking(adminData.data.result.totalBookings)git 
    //   setMonthlyAmount(adminData.data.datas[0].totalAmount)
    //   setMonthlyBooking(adminData.data.datas[0].totalBookings)
    // }
    // else{
    //     console.log("there is no data is found");
    // }
   
}


useEffect(()=>{
  adminMonthlyData()
},[])


// console.log(totalDetail,"this is the total detail");
 
  return (
    <>
    <AdminNavBar/>

    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 bg-cover">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative">
         <div className='w-screen h-auto '>

<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 pt-2 pb-2 '>
</div>

<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 pt-2 pb-2 b'>

  <div className='mx-auto border md:col-span-1 border-blue-500 w-52 bg-blue-200 hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card rounded-md shadow-lg'>
    <div className='flip-card-inner'>
      <div className='w-max h-1/2 p-4'>
        <p className="text-center text-blue-900 font-bold"><b>Total Revenue:{totalAmount}</b></p>
        {/* <p className="text-center text-blue-900 font-bold"><b>Total Partner:10</b></p> */}
      </div>
    </div>
  </div>


  <div className='mx-auto border md:col-span-1 border-yellow-500 w-52 bg-yellow-200 hover:bg-yellow-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card rounded-md shadow-lg'>
    <div className='flip-card-inner'>
      <div className='w-max h-1/2 p-4'>
        <p className="text-center text-yellow-900 font-bold"><b>Total Booking:{totalBooking}</b></p>
      </div>
    </div>
  </div>


  <div className='mx-auto border md:col-span-1 border-green-500 w-52 bg-green-200 hover:bg-green-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card  rounded-md shadow-lg'>
    <div className='flip-card-inner'>
      <div className='w-max h-1/2 p-4'>
        <p className="text-center text-green-900 font-bold"><b>Month Revenue:{monthlyAmount} </b></p>
        {/* <p className="text-center text-green-900 font-bold"><b>Total Revenue:200</b></p> */}
      </div>
    </div>
  </div>

  <div className='mx-auto border md:col-span-1 border-red-500 w-52 bg-red-200 hover:bg-red-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card rounded-md shadow-lg'>
    <div className='flip-card-inner'>
      <div className='w-max h-1/2 p-4'>
        <p className="text-center text-red-900 font-bold"><b>Month Booking:{montlyBooking}</b></p>
        {/* <p className="text-center text-red-900 font-bold"><b> Month Profit:200</b></p> */}
      </div>
    </div>
  </div>
</div>

<div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

  <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto  '>
    <h1 className='text-center mt-8'><b>PARTNER REGISTER PER MONTH</b></h1>



<AdminChart/>



  
  </div>
  <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto mt-8  '>
    <h1 className='text-center '><b>USER REGISTER PER MONTH</b></h1>
    <AdminChatOne/>
    <div className='mt-12'>
    
 
    </div>
  </div>

</div>

<div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

  <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
    

  </div>

</div>

</div>
              
        </div>
      </div>
    </>
  )
}

export default AdminDashBoard
