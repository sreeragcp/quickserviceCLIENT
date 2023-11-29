import React, { useEffect, useState } from "react";
import UserNavBar from "../../components/user/UserNavBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { functionBookingDetail } from "../../services/Apis.js";
import { functionBookingCancel } from "../../services/Apis.js";
import { functionFetchDetail } from "../../services/Apis.js";
import { FaComments } from "react-icons/fa";
import ChatContainerUser from "./ChatContainerUser";
import InputTextUser from "./InputTextUser";
import moment from 'moment';
import UserFooter from "../../components/user/UserFooter";

const UserBooking = () => {
  const [booking, setBooking] = useState([]);
  const [updateBooking, setUpdateBooking] = useState("");
  const [data, setData] = useState([]);
  const [isChatModalOpen, setIsChatModalOpen] = useState(true);

  const user = useSelector((state) => state?.tocken?.userData);
  const tocken = useSelector((state)=>state?.tocken?.tocken)

  const BookingDetails = async () => {
    try {
      const userId = user._id;
      const res = await functionBookingDetail(userId,tocken);
      setBooking([res.data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    BookingDetails();
  }, [updateBooking]);

  const bookingCancel = async (bookingId) => {
    try {
      const res = await functionBookingCancel(bookingId);
      setUpdateBooking(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleButtonClick = async (id) => {
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
    const res = await functionFetchDetail(id,tocken);
    setData([res.data]);
  };

  const handleClick = async () => {
    // Handle the click event here, e.g., open a chat window
    console.log("Chat button clicked");
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  console.log(data, "this is the data");
  console.log(booking, "this is the booking details");

  return (
    <>
      <UserNavBar />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 bg-cover">
        <div className="flex w-full h-[500px]  max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-4">
          <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
            <img
              className="w-auto h-80 sm:h-80 relative top-28"
              src="./images/bulk-booking.jpg"
              alt=""
            />
          </div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="./images/logo-blue.png"
                alt=""
              />
            </div>
            {booking.map((obj) => (
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions">
                    <div className="border w-full border-black rounded-md h-16 m-2">
                      <div className="flex m-2">
                        <div className="w-3 h-3 rounded-full bg-green-700 mt-1 "></div>
                        <div className="text-sm ml-4">{obj?.pickUpPoint}</div>
                      </div>
                      <div className="flex m-2 ">
                        <div className="w-3 h-3 rounded-full bg-red-700 mt-1 "></div>
                        <div className="text-sm ml-4">{obj?.dropPoint}</div>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      {obj.is_canceled ? (
                        <h2 className="text-md mt-1 text-rose-700">CANCELED</h2>
                      ) : (
                        <h2></h2>
                      )}
                      {obj?.status === "pending" ? (
                        <button
                          onClick={() => bookingCancel(obj._id)}
                          className="w-28 h-7 rounded-md bg-red-800 text-white"
                        >
                          Cancel
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <button
                        onClick={() => handleButtonClick(obj._id)}
                        className="w-28 h-7 rounded-md bg-green-500 text-white"
                      >
                        Details
                      </button>
                      <div>
                        {booking.map((obj, index) => (
                          <div key={obj._id}>
                            <button
                              className=" top-[60%] p-2 h-[40px] bg-green-400 rounded-md"
                              onClick={() =>
                                document
                                  .getElementById(`my_modal_${index}`)
                                  .showModal()
                              }
                            >
                              <FaComments color="white" size={"1 rem"} />
                            </button>
                            <dialog id={`my_modal_${index}`} className="modal">
                              <div className="modal-box w-full h-[60vh]">
                                <ChatContainerUser
                                  closeChatModal={closeChatModal}
                                  selectedBookingData={obj}
                                  bookingId={obj._id}
                                  userId={obj.userId}
                                  partnerId={obj.partnerId}
                                />
                              </div>
                              <form method="dialog" className="modal-backdrop">
                                <button
                                  onClick={() =>
                                    document
                                      .getElementById(`my_modal_${index}`)
                                      .close()
                                  }
                                >
                                  close
                                </button>
                              </form>
                            </dialog>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            {data.map((obj) => (
               
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
                    {obj?.pickUpPoint}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.dropPoint}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.totalPrice}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {obj?.status}
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
      <UserFooter/>
    </>
  );
};

export default UserBooking;
