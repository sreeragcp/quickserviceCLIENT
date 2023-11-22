import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/user/UserNavBar";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { userProfileFunction } from "../../services/apis";
import { profileEditFunction } from "../../services/apis";
import UserFooter from "../../components/user/UserFooter";

const UserProfile = () => {
  const [resData ,setResData] =useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userData, setUserData] = useState([]);
  const [fieldBeingEdited, setFieldBeingEdited] = useState(null);

  const user = useSelector((state) => state.tocken.userData);
  const tocken = useSelector((state)=>state.tocken.tocken)
  const userId = user._id;

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    modal.close();
  };

  const handleEdit = (fieldName) => {
    setFieldBeingEdited(fieldName);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    closeModal();

    try {
      const data = {};

      if (fieldBeingEdited === "name") {
        data.name = name;
      } else if (fieldBeingEdited === "email") {
        data.email = email;
      } else if (fieldBeingEdited === "mobile") {
        data.mobile = mobile;
      }
      const res = await profileEditFunction(userId, data,tocken);
      if(res.data.message==="User updated successfully"){
                 setResData(true)
      }
    } catch (err) {
      toast.error("internal server error");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await userProfileFunction(userId,tocken);

      if (res.data) {
        setUserData(res.data);
      } else {
        toast.error("No user data found");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    fetchUser();
  },[resData]);

  return (
    <>
      <UserNavBar />
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-8">
        <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
          <img
            className="w-auto h-80 sm:h-80 relative top-28"
            src="./images/bulk-booking.jpg"
            alt=""
          />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className=" ml-28 w-24 h-24 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="./images/download (5).jpeg"
              alt="Your Image"
            />
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
                  Address :
                </p>
              </div>
            </div>
            <div className="ml-5">
              <div className="mt-14">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {userData.name}
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {userData.email}
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {userData.mobile}
                </p>
              </div>
              <div className="mt-7">
                <p className="font-medium text-gray-500 dark:text-gray-400"></p>
              </div>
            </div>
          </div>

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
                  placeholder={userData.name}
                  className="input w-full max-w-xs h-8"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleEdit("name")}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder={userData.email}
                  className="input w-full max-w-xs h-8"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleEdit("email")}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder={userData.mobile}
                  className="input w-full max-w-xs h-8"
                  onChange={(e) => setMobile(e.target.value)}
                  onFocus={() => handleEdit("mobile")}
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
      <div className="mt-24">
      <UserFooter/>
      </div>
      
    </>
  );
};

export default UserProfile;
