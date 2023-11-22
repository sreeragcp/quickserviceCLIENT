import React, { useEffect, useState } from "react";
import PartnerNavBar from "../../components/partner/PartnerNavBar";
import { fetchPartnerEditFunction } from "../../services/apis";
import { functionFetchPartnerData } from "../../services/apis";
import { useSelector } from "react-redux";

const PartnerProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [data, setData] = useState([]);

  const [partner, setPartner] = useState([]);
  const partnerData = useSelector((state)=>state.tocken.partnerData)
  const partnerId = partnerData._id;

  const tocken = useSelector((state)=>state.tocken.tocken)

  const fetchPartnerData = async (partnerId) => {
    try {
      const res = await functionFetchPartnerData(partnerId,tocken);
      if (res.data) {
        setPartner(res.data);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  console.log(partner,"this is the partner");

  useEffect(() => {
    fetchPartnerData(partnerId);
  }, [data]);

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    modal.close();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    closeModal();

    try {
      const partnerData = await fetchPartnerEditFunction(partnerId, partner,tocken);
      if (partnerData) {
        setData(partnerData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <PartnerNavBar />
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-8">
        <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
          <img
            className="w-auto h-80 sm:h-80 relative top-28"
            src="../images/bulk-booking.jpg"
            alt=""
          />
        </div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className=" w-24 h-24 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="../images/download (5).jpeg"
              alt="Your Image"
            />
          </div>
          <div className=" border border-black w-28 h-6 rounded-md mt-3"> 
          <h2 className="ml-6 text-green-800">{partner.is_verified?"VERIFIED":"NOT VERIFIED"}</h2>
          </div>

          <h1 className=" mt-12 text-3xl font-bold text-gray-900 dark:text-white">
            My Account
          </h1>

          <div className="flex">
            <div>
              <div className="mt-14">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  My Name :
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Email :
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Mobile :
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Vehicle :
                </p>
              </div>
            </div>
            <div className="ml-5">
              <div className="mt-14">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {partner.name}
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {partner.email}
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {partner.mobile}
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400"></p>
                {partner.vehicle}
              </div>
            </div>
          </div>
          <div></div>

          <div className="mt-6 ml-52">
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Edit
            </button>
          </div>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit</h3>
            <div className="flex">
              <div className="ml-7">
                <div className="mt-11">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    My Name :
                  </p>
                </div>
                <div className="mt-7">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Email :
                  </p>
                </div>
                <div className="mt-7">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Mobile :
                  </p>
                </div>
                <div className="mt-7">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Address :
                  </p>
                </div>
              </div>
              <div className="ml-16">
                <div className="mt-11">
                  <input
                    type="text"
                    placeholder={partner.name}
                    className="input w-full max-w-xs h-8"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder={partner.email}
                    className="input w-full max-w-xs h-8"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder={partner.mobile}
                    className="input w-full max-w-xs h-8"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="mt-7">
                  <p className="font-medium text-gray-500 dark:text-gray-400"></p>
                </div>
              </div>
            </div>
            <div></div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={submitHandler}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default PartnerProfile;
