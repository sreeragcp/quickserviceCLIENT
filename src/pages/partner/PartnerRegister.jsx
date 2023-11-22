import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import  {vehicleFetchFunction}  from "../../services/Apis";
import PartnerNavBar from "../../components/partner/PartnerNavBar";

const PartnerRegister = () => {
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aadharFile, setAadharFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [rcFile, setRcFile] = useState(null);
  const [vehicle, setVehicle] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const [vehicleData, setVehicleData] = useState([]);

  const handleVehicleChange = (e) => {
    setVehicle(e.target.value);
  };

  const navigate = useNavigate();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleImage = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImage(reader.result);
      };
      setImage(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const partnerData = {
          name,
          email,
          mobile,
          password,
          aadharFile,
          licenseFile,
          insuranceFile,
          rcFile,
          vehicle,
          state,
          city,
          pin,
        };

        localStorage.setItem("partnerData", JSON.stringify(partnerData));

        const res = await axios.post(
          "https://quickservice.website/partner/register",
          partnerData
        );
        console.log(res, "respose from the register");

        if (res.data.message === "success") {
          navigate("/partner/otp");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const vehicleFetch = async () => {
    console.log("inside the vehicleFEtch");
    try {
      const res = await vehicleFetchFunction();
      console.log(res, "this is res from ");
      if (res.data) {
        setVehicleData(res.data);
      } else if (res.message === "No vehicle data found") {
        toast.warning("No vehicle data found");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    vehicleFetch();
  }, []);

  return (
   <>
   <PartnerNavBar/>
    <div className=" w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-20 ">
      <div className="flex justify-center">
        <ol className="flex justify-evenly w-full p-3 space-x-3 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
          <li
            className={`flex items-center ${
              step >= 1 ? "text-blue-600 dark:text-blue-500" : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
                step >= 1 ? "border-blue-600" : "border-gray-500"
              } rounded-full shrink-0 ${
                step >= 1 ? "dark:border-blue-500" : "dark:border-gray-400"
              }`}
            >
              1
            </span>
            Step 1 <span className="hidden sm:inline-flex sm:ml-2"></span>
            {step >= 1 && (
              <svg
                className="w-3 h-3 ml-2 sm:ml-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke={step >= 1 ? "currentColor" : "gray"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
          <li
            className={`flex items-center ${
              step >= 2 ? "text-blue-600 dark:text-blue-500" : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
                step >= 2 ? "border-blue-600" : "border-gray-500"
              } rounded-full shrink-0 ${
                step >= 2 ? "dark:border-blue-500" : "dark:border-gray-400"
              }`}
            >
              2
            </span>
            Step 2 <span className="hidden sm:inline-flex sm:ml-2"></span>
            {step >= 2 && (
              <svg
                className="w-3 h-3 ml-2 sm:ml-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke={step >= 2 ? "currentColor" : "gray"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
          <li
            className={`flex items-center ${
              step >= 3 ? "text-blue-600 dark:text-blue-500" : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
                step >= 3 ? "border-blue-600" : "border-gray-500"
              } rounded-full shrink-0 ${
                step >= 3 ? "dark:border-blue-500" : "dark:border-gray-400"
              }`}
            >
              3
            </span>
            Step 3
          </li>
        </ol>
      </div>

      <div className="flex">
        <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Register
          </p>
          <img
            className=" ml-6 w-80 h-auto relative top-28"
            src="/images/istockphoto-1271659810-1024x1024.jpg"
            alt=""
          />
        </div>

        {step === 0 && (
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingName"
              >
                Name
              </label>
              <input
                id="LoggingName"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingMobile"
              >
                Mobile
              </label>
              <input
                id="LoggingMobile"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                placeholder="Enter Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingPassword"
              >
                Password
              </label>
              <input
                id="LoggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingConfirmPassword"
                >
                  Confirm Password
                </label>
              </div>
              <input
                id="loggingConfirmPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                class="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300 mr-4"
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                class="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingAdhaar"
              >
                Adhaar Card
              </label>
              <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                multiple
                onChange={(e) => handleImage(e, setAadharFile)}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingLiscense"
              >
                Driving Liscense
              </label>
              <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                onChange={(e) => handleImage(e, setLicenseFile)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingVehicle"
              >
                Vehicle Type
              </label>
              <div className="flex">

              {vehicleData.map((obj)=>(
           <div>
           <label className="ml-3">
             <input   
               type="radio"
               value={obj?.vehicle}
               checked={vehicle === `${obj?.vehicle}`}
               onChange={handleVehicleChange}
             />
             {obj?.vehicle}
           </label>
         </div>
        ))}
              </div>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingInsurance"
              >
                Insurance
              </label>
              <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                onChange={(e) => handleImage(e, setInsuranceFile)}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingRc"
              >
                RC
              </label>
              <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                onChange={(e) => handleImage(e, setRcFile)}
              />
            </div>

            <div className="mt-6">
              <button
                class="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300 mr-4"
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                class="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingName"
              >
                State
              </label>
              <input
                id="LoggingName"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                City
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingMobile"
              >
                Pin
              </label>
              <input
                id="LoggingMobile"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                placeholder="Enter Pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                className="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300 mr-4"
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                className="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
   </>
  );
};

export default PartnerRegister;
