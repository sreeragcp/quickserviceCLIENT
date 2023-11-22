import React, { useEffect, useState } from "react";
import PartnerNavBar from "../../components/partner/PartnerNavBar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { functionRequestAccept } from "../../services/Apis.js";
import { functionRequestReject } from "../../services/Apis.js";
import { funtionGenerateOtp } from "../../services/Apis.js";
import { functionVerifyOtp } from "../../services/Apis.js";
import { functionCurrentBooking } from "../../services/Apis.js";
import { Loader } from "google-maps";
import axios from "axios";
import InputText from "./InputText";
import ChatContainer from "./ChatContainer";
import { FaComments } from "react-icons/fa";

const PartnerOrderManage = () => {
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const partnerData = useSelector((state) => state.tocken.partnerData);
  const tocken = useSelector((state)=>state.tocken.tocken)
  const partnerEmail = partnerData.email;

  const [pickupPoint, setPickupPoint] = useState(null);
  const [dropPoint, setDropPoint] = useState(null);

  const [message, setMessage] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState();
  const [otpPage, setOtpPage] = useState(true);
  const [currentBookingData, setCurrentBookingData] = useState([]);
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState([]);

  const socket = io("https://quickservice.website");

  useEffect(() => {
    socket.emit("join_room", partnerEmail);
    socket.on("new_request", (data) => {
      setMessage(data);
      setEmail(data.userData.email);
      setPickupPoint(data.pickupPoint);
      setDropPoint(data.dropPoint);
    });

    socket.emit("test_message", { message: "accepted" });

    return () => {
      socket.off("join_room");
    };
  }, [[partnerEmail, socket]]);

  const submitAccept = async () => {
    try {
      const userId = message.userData._id;
      const res = await functionRequestAccept(userId,tocken);
    } catch (error) {}
  };

  const submitReject = async () => {
    try {
      const userId = message.userData._id;
      const res = await functionRequestReject(userId,tocken);
    } catch (error) {}
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    modal.close();
  };

  const submitHandler = async () => {
    closeModal();
  };

  async function initMap() {
    const pickupInput = pickupPoint;
    const dropInput = dropPoint;

    const options = {};
    const loader = new Loader(googleApiKey, options);
    const google = await loader.load();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 12.9716, lng: 77.5946 },
    });

    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    if (pickupInput && dropInput) {
      onChangeHandler();
    } else {
      console.log("no imputs");
    }
  }

  async function calculateAndDisplayRoute(
    directionsService,
    directionsRenderer
  ) {
    const res = await directionsService
      .route({
        origin: {
          query: pickupPoint,
        },
        destination: {
          query: dropPoint,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => {
        console.log(e);
        window.alert("Directions request failed due to " + status);
      });
  }

  window.initMap = initMap;

  const openModal = async () => {
    initMap();
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  };

  const handleButtonClick = () => {
    setClicked(true);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const getBookingData = async () => {
    console.log("inside the booking data");
    try {
      const partnerId = partnerData._id;
      console.log(partnerId,"this is the partnerId");
      const response = await functionCurrentBooking(partnerId,tocken);
      console.log(response,"thisi is the response");
      if (response) {
        setCurrentBookingData(response.data);
      }
    } catch (error) {
      console.log(error.messsage);
    }
  };

  const updateBooking = async (status) => {
    try {
      const partnerId = partnerData._id;
      const res = await axios.patch(
        `https://quickservice.website/partner/updateBooking/${partnerId}`,
        { status }
      );
      setResponse(res.data);
      if (response.data === "out_for_delivery") {
        const orderOtp = await funtionGenerateOtp(partnerId);
        console.log(orderOtp, "this is orderOtp");
        if (orderOtp.data.message === "success") {
          setOtpPage(true);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBookingData()
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleStatusClick = (status) => {
    updateBooking(status);
    setDropdownOpen(false);
  };

  const verfyOtp = async (e) => {
    try {
      e.preventDefault();
      const otpValue = otp1 + otp2 + otp3 + otp4;
      const partnerId = partnerData._id;
      console.log(otpValue);
      const res = await functionVerifyOtp({ otpValue }, partnerId);

      if (res.data.message === "success") {
        toast.success("Verification successful!");
        setOtpPage(false);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedBookingDetails({});
  };

  console.log(currentBookingData, "this is currentBoooing data");
  return (
    <>
      <PartnerNavBar />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 bg-cover ">
        <div className="flex w-full h-[600px] max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-4">
          <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
            <button
              className="absolute top-[10%] p-1 h-[40px] bg-green-400 rounded-md"
              onClick={() => document.getElementById(`my_modal_2`).showModal()}
            >
              <FaComments color="white" size={"1 rem"} />
            </button>
            <img
              className="w-auto h-80 sm:h-80 relative top-28"
              src="..\images\safe-contactless-delivery-courier-to-home-by-covid-19-free-vector.jpg"
              alt=""
            />
          </div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-3/4">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="../images/logo-blue.png"
                alt=""
              />
            </div>
            <div className="flex justify-between mt-4 h-32 ">
              {otpPage ? (
                <div className="w-52 h-32 rounded-lg ml-6 shadow-xl pt-4 ">
                  <form action="" method="post">
                    <div className="flex flex-col space-y-4 items-center justify-center h-full">
                      <div className="flex flex-row space-x-2">
                        <input
                          className="w-11 h-11 flex-grow text-center outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          value={otp1}
                          onChange={(e) => setOtp1(e.target.value)}
                        />
                        <input
                          className="w-11 h-11 flex-grow text-center outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          value={otp2}
                          onChange={(e) => setOtp2(e.target.value)}
                        />
                        <input
                          className="w-11 h-11 flex-grow text-center outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          value={otp3}
                          onChange={(e) => setOtp3(e.target.value)}
                        />
                        <input
                          className="w-11 h-11 flex-grow text-center outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          value={otp4}
                          onChange={(e) => setOtp4(e.target.value)}
                        />
                      </div>
                      <button
                        className="w-24 h-9 mt-2 border rounded-xl outline-none py-2 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={verfyOtp}
                      >
                        Verify
                      </button>
                      {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mt-2">
                        <p>Didn't receive the code?</p>{" "}
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div> */}
                    </div>
                  </form>
                </div>
              ) : (
                <div></div>
              )}
              <div className=" w-40  overflow-hidden bg-white rounded-lg shadow-lg ">
                <h1 className="ml-11 text-sm font-normal text-emerald-500">
                  COSTOMER
                </h1>
                <div className="flex mt-2">
                  <div>
                    <p className="font-medium text-gray-500 dark:text-gray-400 ml-2">
                      Name :
                    </p>
                    <p className="font-medium text-gray-500 dark:text-gray-400 ml-2">
                      Mobile :
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {message?.userData?.name}
                    </p>
                    <p className="text-lg font-semibold">
                      {message?.userData?.mobile}
                    </p>
                  </div>
                </div>
                {/* <p type="button" onClick={openModal}>
                My route
              </p> */}
                <img
                  onClick={openModal}
                  className="ml-28 w-10 h-10 cursor-pointer animate-bounce"
                  src="../images/location.svg"
                  alt=""
                />
                {/* <img className="h-28 rounded-md" src=".\images\download (5).jpeg" alt="" /> */}
              </div>
            </div>
            <div className="flex justify-end mr-3 mt-3">
              <div>
                <button
                  onClick={submitAccept}
                  on
                  className=" w-16 h-8 rounded-md text-white bg-green-400 "
                >
                  Accept
                </button>
              </div>
              <div>
                <button
                  onClick={submitReject}
                  className="ml-3 w-16 h-8 rounded-md text-white bg-red-500 "
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="mt-14  w-full ">
              <div className="flex justify-between w-full mt-2 rounded-lg h-8 bg-[#7EAC8B]">
                <div className="ml-7 mt-1  font-semibold">STATUS</div>
                <div className="mr-7 mt-1  font-semibold">
                  <button className="w-36 h-5" onClick={toggleDropdown}>
                    {response ? response.data : "UPDATE STATUS"}{" "}
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 mr-10 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => handleStatusClick("packed")}
                          className="block px-4 py-2  w-full bg-green-100 hover:bg-green-200 focus:outline-none"
                        >
                          Packed
                        </button>
                        <button
                          onClick={() => handleStatusClick("dispatched")}
                          className="block px-4 py-2  w-full bg-green-100 hover:bg-green-200 focus:outline-none"
                        >
                          Dispatched
                        </button>
                        <button
                          onClick={() => handleStatusClick("out_for_delivery")}
                          className="block px-4 py-2  w-full bg-green-100 hover:bg-green-200 focus:outline-none"
                        >
                          Out for Delivery
                        </button>
                        <button
                          onClick={() => handleStatusClick("delivered")}
                          className="block px-4 py-2  w-full bg-green-100 hover:bg-green-200 focus:outline-none"
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <dialog id="my_modal_2" className="modal">
              <div className="chats modal-box h-[50vh] relative">
                <ChatContainer
                  closeChatModal={closeChatModal}
                  selectedBookingData={selectedBookingDetails}
                  bookingId={currentBookingData._id}
                  userId={currentBookingData.userId}
                  partnerId={currentBookingData.partnerId}
                />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Route</h3>

          <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
            <div
              id="map"
              className=" ml-12 mt-14 rounded-md w-96 h-[50vh] bg-red-100"
            ></div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={submitHandler}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_1" className="modal-card">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {isChatModalOpen && (
        <ChatContainer
          closeChatModal={closeChatModal}
          selectedBookingData={selectedBookingDetails}
          bookingId={selectedBookingDetails.bookingId}
          userId={selectedBookingDetails.userId}
          partnerId={selectedBookingDetails.partnerId}
        />
      )}
    </>
  );
};

export default PartnerOrderManage;
