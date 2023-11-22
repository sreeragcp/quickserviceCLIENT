import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/admin/AdminNavBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { verifyPartnerFunction } from "../../services/apis";
import { functionFetchPartner } from "../../services/apis";
import { useSelector } from "react-redux";

const AdminPartnerList = () => {

  const tocken = useSelector((state)=>state.tocken.tocken)
  const [partnersData, setPartnersData] = useState([]);
  const [verify, setVerify] = useState(false);

  const [data,setData] = useState([])
  const fetchPartners = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${tocken}`,
        'Content-Type': 'application/json',
      };
      const res = await axios.get("https://quickservice.website/admin/partnersList",{headers});

      if (res.data) {
        setPartnersData(res.data);
      } else if (res.data.message === "No partner data found") {
        toast.warning("No partner data found");
      }
    } catch (error) {
      toast.error("An error occurred while fetching partner data");
    }
  };

  const handleDetailsClick = async(id)=>{
    try {
      const response= await functionFetchPartner(id,tocken)
      const result = response.data
      console.log(result,"this is the result");
      if(result){
        setData(result)
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchPartners();
    
  }, []);

  const userVerify = async (partnerId) => {
    console.log("inside the userVerify");
    console.log(partnerId, "this is the partnerid");
    try {
      const res = await verifyPartnerFunction({ partnerId });
      if (res.data) {
        setVerify(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(data, "this is the partnerdata");
  return (
    <>
      <AdminNavBar />

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
            {partnersData.map((obj) => (
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
                <td>{obj?.mobile}</td>
                <td>{obj?.email}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {

                      document.getElementById("my_modal_1").showModal();
                      handleDetailsClick(obj?._id); // Replace userId with the actual id of the user
                    }}
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
          <div className="modal-box enlarged">
            <div className="avatar ml-44">
              <div className="w-24 rounded">
                <img src="..\images\download (5).jpeg" />
              </div>
            </div>
            <button
              className="btn btn-wide ml-24"
              onClick={() => userVerify(data._id)}
            >
              {verify ? "verified" : "verify"}
            </button>
            <div className="flex ml-1 mt-7">
              <div>
                <div className="">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    My Name :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Email :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Mobile :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    State :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    City :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Pin :
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Vehicle :
                  </p>
                </div>
              </div>
              <div className="ml-5">
                <div className="">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.name}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.email}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.mobile}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.state}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.city}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.pin}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {data.vehicle}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-auto enlarged ">
              <div className="w-96 mt-7 h-32 rounded-md shadow-md border">
                <img
                  className="h-28 rounded-md"
                  src={data.aadhar}
                  alt="adhaar"
                />
              </div>
              <div className="w-96 mt-7 ml-9 h-32 rounded-md shadow-md border">
                <img
                  className="h-28 rounded-md"
                  src={data.liscense}
                  alt="liscense"
                />
              </div>
            </div>
            <div className="flex w-auto enlarged ">
              <div className="w-96 mt-7 h-32 rounded-md shadow-md">
                <img
                  className="h-28 rounded-md"
                  src={data.insurance}
                  alt="insurance"
                />
              </div>
              <div className="w-96 mt-7 ml-9 h-32 rounded-md shadow-md">
                <img
                  className="h-28 rounded-md"
                  src={data.rcFile}
                  alt="rcFile"
                />
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
   
    </>
  );
};

export default AdminPartnerList;
