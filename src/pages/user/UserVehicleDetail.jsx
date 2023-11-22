import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Loader } from "google-maps";
import UserNavBar from "../../components/user/UserNavBar";
import { useParams } from "react-router-dom";
import { fetchVehicleDetails } from "../../services/Apis.js";
import { fetchCouponData } from "../../services/Apis.js";
import { functionBookingHandle } from "../../services/Apis.js";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import useRazorpay from "react-razorpay";
import { functionBookingCompletion } from "../../services/Apis.js";
import { useNavigate } from "react-router-dom";
import UserFooter from "../../components/user/UserFooter";
import { functionCouponApply } from "../../services/Apis.js";

const UserVehicleDetail = () => {
  const [Razorpay] = useRazorpay();
  let amount;
  const socket = io("https://quickservice.website");

  const token = useSelector((state) => state.tocken);
  const tocken = useSelector((state)=>state.tocken.tocken)

  console.log(token, "thissis token");

  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState([]);
  const [estimationPage, setEstimationPage] = useState(true);
  const [pickupPoint, setPickupPoint] = useState(null);
  const [dropPoint, setDropPoint] = useState(null);
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [partner, setPartner] = useState([]);
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [bookingButton, setBookingButton] = useState("");
  const [bookerName, setBookerName] = useState("");
  const [phnNumber, setPhnNumber] = useState("");
  // let distanceValue

  console.log(bookerName, "this is the name");
  console.log(phnNumber, "this is the phn Number");

  const { id } = useParams();
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  // useEffect(() => {
  //   const socket = new io.connect("https://quickservice.website");
  //   setSocket(socket);
  // }, []);

  useEffect(() => {
    function initAutocomplete() {
      const pickupInput = document.getElementById("pickup_address");
      const dropInput = document.getElementById("drop_address");
      const options = {
        types: ["geocode"], // Restrict to addresses
      };

      const autocompletePickup = new window.google.maps.places.Autocomplete(
        pickupInput,
        options
      );
      autocompletePickup.addListener("place_changed", function () {
        const place = autocompletePickup.getPlace();
        setPickupPoint(place?.formatted_address);
      });
      const autocompleteDrop = new window.google.maps.places.Autocomplete(
        dropInput,
        options
      );
      autocompleteDrop.addListener("place_changed", function () {
        const place = autocompleteDrop.getPlace();
        setDropPoint(place.formatted_address);
        // Do something with the selected place data for the drop input.
      });
    }

    if (window.google) {
      // Google Maps API script is already loaded
      initAutocomplete();
    } else {
      // Load the Google Places API when the component mounts
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    }
  }, []);

  const fetchVehicle = async () => {
  
    const res = await fetchVehicleDetails(id,tocken);
    if (res.data) {
      setVehicle(res.data);
    }
  };

  const fetchCoupon = async () => {
    const couponData = await fetchCouponData(tocken);
    if (couponData.data) {
      setCoupon(couponData.data);
    }
  };

  useEffect(() => {
    fetchVehicle();
    fetchCoupon();
  }, []);

  const submitHandler = async () => {
    initMap();
    setEstimationPage(false);
  };

  ///////    to get the route between the locations   /////////

  async function initMap() {
    // const pickupInput = document.getElementById("pickup_address");
    // const dropInput = document.getElementById("drop_address");
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
        console.log(response, "this is the reponse");
        directionsRenderer.setDirections(response);
        const route = response.routes[0];
        const leg = route.legs[0];
        const distance = leg?.distance?.value;
        const totalDistance = distance / 1000;
        const pricePerKm = vehicle.pricePerKm;
        const price = totalDistance * pricePerKm;
        setPrice(price);
        setTotalPrice(price)
      })
      .catch((e) => {
        console.log(e);
        window.alert("Directions request failed due to " + status);
      });
  }

  window.initMap = initMap;

  /// coupon apply////

  const applyCoupon = async (code) => {
    const data ={code,price}
    const res = await functionCouponApply(data,tocken)
    console.log(res,"this is the apply coupon response");
    if(res.data){
      setTotalPrice(res.data);
    }
    toast.success("Coupon applied successfully");
  };

  ////booking/////

  const HandleBooking = async () => {
    try {
      const userId = token.userData._id;
      const city = localStorage.getItem("selectedCity");
      const data = {
        city: city,
        pickupPoint: pickupPoint,
        dropPoint: dropPoint,
      };
          const res = await functionBookingHandle(userId,data,tocken);
      if (res.data) {
        setPartner(res.data);
        setEmail(res.data._id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const userId = token.userData.email;
    socket.emit("join", userId);
    socket.on("message", (data) => {
      console.log(data, "this is tahedata");
    });

    socket.on("acceptBooking", (data) => {
      toast.success("accept");
      setBookingButton(data);
    });

    socket.on("rejectBooking", (data) => {
      toast.success("reject");
      setBookingButton(data);
    });
  }, []);

  if (totalPrice) {
    amount = totalPrice;
  }

  const HandlePayment = (e) => {
    const userData = token.userData;
    const data = {
      userData: userData,
      partnerData: partner,
      pickupPoint: pickupPoint,
      dropPoint: dropPoint,
      totalPrice: totalPrice,
      number: phnNumber,
      name: bookerName,
    };
    e.preventDefault();
    if (amount === "") {
      alert("amount is not set");
    } else {
      var options = {
        key: "rzp_test_93ATDTy6qKeM4A",
        key_secret: "caCaEnvv0qHtgANYPHBABQfi",
        amount: amount * 100,
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: async function (response) {
          if (response) {
            const res = await functionBookingCompletion(data,tocken);
            if (res.data.message === "success") {
              navigate("/bookingCompletion");
            }
          }
        },
        prefill: {
          name: "Velmurugan",
          email: "mvel1620r@gmail.com",
          contact: "7904425033",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      if (typeof window.Razorpay === "function") {
        var pay = new window.Razorpay(options);
        pay.open();
      } else {
        console.error("Razorpay script is not loaded or not available.");
      }
    }
  };

  const [selectedCoupon, setSelectedCoupon] = useState('');

  const handleCouponChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCoupon(selectedValue);
    applyCoupon(selectedValue);
  };

  return (
    <>
      <UserNavBar />
      <Toaster position="top-right" reverseOrder={false} />
      {estimationPage ? (
        <div className=" relative">
          <div className=" h-96 ">
            <img
              fill
              className="h-96 w-full"
              src="\images\delivery.jpg"
              alt=""
            />
          </div>
          <div className=" w-full h-32  mt-4">
            <div className="flex w-[60%] mx-auto h-28 borde shadow-2xl  rounded-md bg-gray-100 absolute z-10 top-80 ml-6  left-72 mt-11 ">
              <div className="w-1/5 border">
                <div>
                  <p className="ml-6 mt-7">Pickup Address*</p>
                  <input
                    type="text"
                    id="pickup_address" // Add an ID for pickup address input
                    placeholder="Sending from"
                    className=" mt-2 ml-2 input h-7 w-11/12 rounded-sm"
                  />
                </div>
              </div>
              <div className="w-1/5 border">
                <div>
                  <p className="ml-6 mt-7">Drop Address*</p>
                  <input
                    type="text"
                    id="drop_address" // Add an ID for drop address input
                    placeholder="Sending to"
                    className=" mt-2 ml-2 input h-7 w-11/12 rounded-sm"
                  />
                </div>
              </div>
              <div className="w-1/5 border ">
                <div>
                  <p className="ml-6 mt-7">Phone Number*</p>
                  <input
                    id="phn_number"
                    value={phnNumber}
                    onChange={(e) => setPhnNumber(e.target.value)}
                    type="number"
                    placeholder="Contact details"
                    className=" mt-2 ml-2 input h-7 w-11/12 rounded-sm"
                  />
                </div>{" "}
              </div>
              <div className="w-1/5 border ">
                <div>
                  <p className="ml-6 mt-7">Name*</p>
                  <input
                    id="booker_name"
                    value={bookerName}
                    onChange={(e) => setBookerName(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                    className=" mt-2 ml-2 input h-7 w-11/12 rounded-sm"
                  />
                </div>
              </div>
              <div className="w-1/5border border-gray-400">
                <button
                  onClick={submitHandler}
                  className=" ml-2 mt-8 w-40 h-10 shadow-md text-white rounded-md bg-blue-700"
                >
                  Estimation
                </button>
              </div>
            </div>
          </div>
          <div className=" flex  mt-5 justify-center ">
            <p className="font-medium">{vehicle.vehicle} From Quick Sort</p>
          </div>
          <div className="flex justify-center">
            <div className="card mb-3 w-7/12 h-72 bg-base-100  shadow-2xl">
              <div className="mb-8 card-body">
                <div className="flex">
                  <div className="w-1/3  h-52 ">
                    <img src={vehicle.Image} alt="" />
                  </div>
                  <div className="w-2/3">
                    <h2 className="mt-5 font-bold">{vehicle.vehicle}</h2>
                    <h4 className="font-medium">
                      {vehicle.minWeight} - {vehicle.maxWeight} Kg
                    </h4>
                    <p className="mt-2">
                      Base fare is inclusive of 1.0 km distance & 25 minutes of
                      order time. Pricing may vary basis locality. Please note,
                      road tax, parking fee, etc, will be applicable over and
                      above ride fare.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 bg-cover ">
          <p className=" text-xl text-center text-gray-600 dark:text-gray-200">
            Book Now!
          </p>

          <div className="flex h-[500px] w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-4">
            <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
              <div
                id="map"
                className=" ml-12 mt-14 rounded-md w-96 h-[50vh] bg-red-100"
              ></div>
            </div>
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-between">
                <div className="mt-11">
                  <img
                    className="w-24 rounded-full  "
                    src={vehicle.Image}
                    alt=""
                  />
                  <p className="font-semibold">{vehicle.vehicle}</p>
                  <p></p>
                </div>

                <div className="   ">
                  <div className=" rounded-lg shadow-lg dark:bg-gray-800 ">
                    <div className="flex justify-center">
                      <img
                        className=" w-24 h-24 rounded-full "
                        src="..\images\download (5).jpeg"
                        alt=""
                      />
                    </div>

                    <p className="p-1">Partner:{partner.name}</p>
                    <p className="p-1">Contact:{partner.mobile}</p>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={HandleBooking}
                      className="bg-slate-500 p-1 rounded-md text-white justify-center items-center"
                    >
                      Find partner
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="">
                  <div className="mt-8">
                    <p className="font-medium text-gray-500 dark:text-gray-400">
                      Price :
                    </p>
                  </div>
                  <div className="mt-7">
                    <p className="font-medium text-gray-500 dark:text-gray-400">
                      Total Price :
                    </p>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="mt-8">
                    <p className="font-medium text-gray-500 dark:text-gray-400">
                      {price}
                    </p>
                  </div>
                  <div className="mt-7">
                    <p className="font-medium text-gray-500 dark:text-gray-400">
                      {totalPrice}
                    </p>
                  </div>
                </div>

                {/* 
                <div
                  type="button"
                  onClick={applyCoupon}
                  className=" border border-black w-28 h-8 mt-14 ml-32 bg-green-400 rounded-md"
                >
                  <p className="text-lg text-white ml-3">
                    {coupon[0].couponCode}
                  </p>
                </div> */}
              </div>
              <div className="ml-64">
                <select
                  name=""
                  id=""
                  value={selectedCoupon}
                  onChange={handleCouponChange}
                >
                  <option value="">Select Coupon</option>
                  {coupon.map((c, index) => (
                    <option key={index} value={c.couponCode}>
                      {c.couponCode}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                {bookingButton.message == "success" ? (
                  <button
                    className=" disabled w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                    onClick={HandlePayment}
                    // disabled={!bookingButton.message==="success"} // Add this line
                  >
                    Book Now
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <UserFooter />
    </>
  );
};

export default UserVehicleDetail;
