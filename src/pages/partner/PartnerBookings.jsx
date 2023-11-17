import React, { useEffect, useState } from "react";
import PartnerNavBar from "../../components/partner/PartnerNavBar";
import { functionBookingDetails } from "../../services/Apis";
import moment from "moment";
import { Chart } from "chart.js";

const PartnerBookings = () => {
  const [bookingDetail, setBookingDetails] = useState([]);
  const partnerData = localStorage.getItem("partnerData");
  const partner = JSON.parse(partnerData);
  const partnerId = partner._id;

  const fetchData = async () => {
    try {
      const res = await functionBookingDetails(partnerId);
      setBookingDetails([res.data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(bookingDetail, "this is the detail");

  return (
    <>
      <PartnerNavBar />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 bg-cover ">
        {bookingDetail.map((obj) => (
          <div className="flex w-full h-[500px] max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-4">
            <div className="h-52 w-[70%] m-10 border border-black  overflow-hidden bg-white rounded-lg shadow-xl">
              <div className="flex h-40 w-full">
                <div className=" w-3/4">
                  <div className="  text-xl ml-5 font-semibold h-10 m-2">
                    {moment(obj.bookingDate).format("MMMM D, YYYY")}
                  </div>
                  <div className="border border-green-100 rounded-md h-24 m-2">
                    <div className="flex m-4">
                      <div className="w-4 h-4 rounded-full bg-green-700 mt-1 "></div>
                      <div className=" ml-4">{obj.pickUpPoint}</div>
                    </div>
                    <div className="flex m-4 ">
                      <div className="w-4 h-4 rounded-full bg-red-700 mt-1 "></div>
                      <div className="ml-4">{obj.dropPoint}</div>
                    </div>
                  </div>
                </div>
                <div className=" w-1/2">
                  <div className=" flex justify-between float-left w-32 rounded-md h-7 m-4 ">
                    <div>
                      <p className="font-medium text-gray-500 dark:text-gray-400 ml-2">
                        PRICE :
                      </p>
                    </div>
                    <div>
                      <p className="text-md font-semibold">{obj.totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
                <div className=" flex justify-between ml-16 w-3/4 mt-2 rounded-lg h-8 bg-[#7EAC8B]">
                  <div className="ml-7 mt-1 text-white font-semibold">
                    STATUS
                  </div>
                  <div className="mr-7 mt-1 text-white font-semibold">
                    {obj.status}
                  </div>
                </div> 
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PartnerBookings;
