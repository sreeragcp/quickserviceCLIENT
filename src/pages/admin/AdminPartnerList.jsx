import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../components/admin/AdminNavBar'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";



const AdminPartnerList = () => {

    const [partnersData,setPartnersData] = useState([])

        const fetchPartners = async()=>{

            console.log('inside the fetch partner');
            try {
                const res = await axios.get("http://localhost:4002/admin/partnersList")

                console.log(res,"this is the response");
                
                if(res.data){
                    setPartnersData(res.data)
                }
                else if(res.data.message==="No partner data found"){

                    toast.warning("No partner data found")
                }

            } catch (error) {
                toast.error("An error occurred while fetching partner data")
            }
        }

        useEffect(()=>{
            fetchPartners()
        },[])


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
        <th>Name</th>
        <th>Mobile</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {partnersData.map((obj)=>(
         <tr>
         <th>
           <label>
             <input type="checkbox" className="checkbox" />
           </label>
         </th>
         <td>
           <div className="flex items-center space-x-3">
             {/* <div className="avatar">
               <div className="mask mask-squircle w-12 h-12">
                 <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
               </div>
             </div> */}
             <div>
               <div className="font-bold">{obj?.name}</div>
             </div>
           </div>
         </td>
         <td>
           {obj?.mobile}
         </td>
         <td>{obj?.email}</td>
         <th>
           <button className="btn btn-ghost btn-xs">details</button>
         </th>
       </tr>
      ))}
     
    </tbody>
    
  </table>
</div>

    </>
  )
}

export default AdminPartnerList
