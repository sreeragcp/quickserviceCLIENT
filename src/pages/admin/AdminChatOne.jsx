import React, { useState, useEffect,useRef } from 'react'
import Chart from 'chart.js/auto';
import { functionPerdayEarnings } from '../../services/Apis';
import { functionGetUserRegister } from '../../services/Apis';

const AdminChatOne = () => {

const [monthlyUserData, setMonthlyUserData] = useState([]);

   const getUserRegister = async()=>{
    try {
      const response = await functionGetUserRegister()
      setMonthlyUserData([response.data]);
    } catch (error) {
      
    }
   }

   useEffect(()=>{
    getUserRegister()
   },[])


   const chartRefOne = useRef(null);
   let month = [];
   let monthNumberofUser = [];
   
   if (monthlyUserData && monthlyUserData.length > 0) {
     month = monthlyUserData.map((e) => e.month !== undefined ? e.month : 'N/A');
     monthNumberofUser = monthlyUserData.map((e) => e.totalUsers !== undefined ? e.totalUsers : 0);
   }
   
useEffect(() => {
  const ctxOne = chartRefOne.current;
  const myChart = new Chart(ctxOne, {
    type: 'bar',
    data: {
      // labels: monthlyUserData.map(entry => `${entry.month}/${entry.year}`),
      labels:month,
      datasets: [{
        label: 'User Registrations per Month',
        // data: monthlyUserData.map(entry => entry.totalUsers),
        data:monthNumberofUser,
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Cleanup when the component is unmounted
  return () => {
    myChart.destroy();
  };
}, [monthlyUserData]);


  return (

  <>
 <div >
    <canvas ref={chartRefOne}></canvas>
  </div>
  </>
  )

}


export default AdminChatOne
