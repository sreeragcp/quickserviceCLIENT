import React from 'react'
import UserNavBar from '../../components/user/UserNavBar'

const BookingCompletion = () => {
  return (
    <>
    <div className='bg-gray-100 h-screen w-screen'>

   
     <div className='w-full'>
     <UserNavBar/>
      <div className="">
        <div className="container mx-auto py-16">
          <div className="flex justify-between">
            <div className="w-1/2">
              
            </div>
            <div className="w-1/2">
              {/* Additional content can be placed here */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 ">
        <div className="container mx-auto py-16">
          <div className="text-center">
            <h2 className="text-4xl text-black">Thank you!</h2>
            <p className="text-xl mb-5">Your Booking successfully completed.</p>
            <a href="shop.html" className="btn btn-sm btn-outline-black">Back to Home</a>

          </div>
         
        </div>
        <div className="w-screen h-fit relative ">
        <img
          className=" cycle absolute top-0 left-0 w-[150px] h-[150px] "
          src="\images\123.png"
          alt=""
        />
      </div>
      </div>
    </div>
    </div>

    
    </>
  )
}

export default BookingCompletion
