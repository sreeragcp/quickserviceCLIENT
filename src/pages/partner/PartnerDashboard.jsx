import React from "react";
import PartnerNavBar from "../../components/partner/PartnerNavBar";
import { NavLink } from "react-router-dom";

const PartnerDashboard = () => {
  return (
    <>
      <PartnerNavBar />

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 bg-cover">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative">
          <h1>Sales Report</h1>
          <img
            className="w-auto h-80 sm:h-80 relative top-2"
            src="./images/bulk-booking.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default PartnerDashboard;
