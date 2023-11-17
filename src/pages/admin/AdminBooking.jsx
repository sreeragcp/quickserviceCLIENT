import React,{useEffect, useState} from 'react'
import AdminNavBar from '../../components/admin/AdminNavBar'
import { functionFetchBookingDetails } from '../../services/Apis'
import { functionFetchDetails } from '../../services/Apis'
import moment from 'moment';




const AdminBooking = () => {

    const [bookData,setBookData] = useState([])
    const [data,setData] = useState([])

    const detailsBooking = async()=>{
        try {
            const res = await functionFetchBookingDetails()
            if(res.data){
                setBookData(res.data)
            }
            else{
                console.log("there is no book data");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        detailsBooking()
    },[])


    const handleButtonClick = async(id)=> {
        const modal = document.getElementById("my_modal_1");
        modal.showModal();
        const res = await functionFetchDetails(id)
        console.log(res,"this is the res");
        setData([res.data])
      }

  return (
    <>
    <AdminNavBar/>
    <div className="mt-20 ml-60 max-w-5xl">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>User Name</th>
              <th>Partner Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookData.map((obj) => (
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{obj?.userData?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{obj?.partnerData.name}</td>
                <td className="font-bold">{obj?.status}</td> 
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={()=>handleButtonClick(obj?._id)}
                      
                  >
                    details
                  </button>
                </th>
              </tr>
             ))}
          </tbody>
        </table>
      </div>


     <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Details</h3>
          <div className="flex ml-1 mt-7">
              <div>
                <div className="">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Booking Id :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Date :
                  </p>
                </div>
                
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                  Name :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Mobile No:
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Pickup Point :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Drop Point :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                  Total Price :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    status :
                  </p>
                </div>
              </div>
              {data.map((obj)=>(
              <div className="ml-5">
                <div className="">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.booking_id}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    { moment(obj.bookingDate).format("MMMM D, YYYY")}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.booker_name}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.booker_Mobile}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?. pickUpPoint}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.dropPoint}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?. totalPrice}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?. status}
                  </p>
                </div>
              </div>
              ))}
            </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

     
    </>
  )
}

export default AdminBooking
