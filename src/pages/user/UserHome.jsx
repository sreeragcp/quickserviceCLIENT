import React, { useEffect, useState } from "react";
import UserNavBar from "../../components/user/UserNavBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserHome = () => {
  const [cityList, setCityList] = useState([]);
  const [vehicleData,setVehicleData] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchVehicle = async()=>{

    const vehicleData = await axios.get("http://localhost:4002/vehicleList")

      if(vehicleData){
         setVehicleData(vehicleData.data)
      }
  } 

  const fetchCity = async () => {
    const res = await axios.get("http://localhost:4002/cityList");
    if (res.data) {
      setCityList(res.data);
    } else if (res.data.message === "failed") {
      toast.warning("Database query failed. Please try again later.");
    } else if (res.data.message === "server issue") {
      toast.warning("There is a server issue. Please contact the administrator.");
    }
  };

  useEffect(() => {
    fetchCity();
    fetchVehicle()
  },[]);

  return (
    <>
      <UserNavBar />

      <div className="border h-96 bg-teal-600 ">
        <h1 className="text-white text-5xl font-bold w-auto mt-20">
          A great value parcel delivery & <br /> courier service you can,
          <br /> trust
        </h1>
      </div>

      <div className=" absolute top-96 ml-44 card w-9/12 h-72 bg-base-100 shadow-xl mb-20">
        <div className="card-body">
          <img
            onClick={openModal}
            className="w-10 h-10 cursor-pointer animate-bounce"
            src="./images/location.svg"
            alt=""
          />
          <div className="card-actions">
            {vehicleData.map((obj)=>(
              <div className="cursor-pointer hover:scale-110 duration-700">
              <div className="ml-28 mt-3 h-32 w-32 rounded-md border border-black ">
              <img className="rounded-md" src={obj?.Image} />
            </div>
            <div className=" mt-2 ml-32">
              <p>{obj?.vehicle}</p>
            </div>
            </div>
            ))}
            <div className="w-28 h-36 bg-blue-700 ml-28 mt-2 rounded-lg ">
                <h1 className="text-white ml-3 mt-5 font-bold">Get an Estimate</h1>
                <p className="text-white ml-3">(Takes 2 min)</p>
                <img
                  className="ml-2 mt-5 hover:translate-x-2 transition-transform duration-300 ease-in-out"
                  src="./images/east.svg"
                  alt=""
                />
              </div>
             
          </div>
        </div>
      </div>

      <div>
        {/* Main modal */}
        {isModalOpen && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            className="fixed  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full border border-black"
          >
            <div className="ml-96 w-full max-w-3xl max-h-full  border border-black rounded-md">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-4xl font-bold ml-60 text-gray-900 dark:text-white CitySelectorModal_title__tHhus">
                    Choose your city
                  </h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className=" flex flex-wrap ml-10 p-10 gap-20 border-red-500">
                  {cityList.map((obj) => (
                    <div>
                      <div className=" h-36 w-36 border border-black  rounded-md cursor-pointer">
                        <img className="rounded-md cursor-pointer" src={obj?.image}></img>
                      </div>
                      <p className="ml-8 mt-2 cursor-pointer">{obj?.city}</p>
                    </div>
                  ))}
                </div>
                {/* Modal footer */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserHome;
