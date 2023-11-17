import React, { useState, useEffect,useRef } from 'react'
import Chart from 'chart.js/auto';
// import { functionPerdayEarnings } from '../../services/Apis';
import { getTotalBookingDetails } from '../../services/Apis';




const AdminChart = () => {
  const [monthlyUserData, setMonthlyUserData] = useState([]);
    // const [monthlyData, setMonthlyData] = useState([]);

    const getTotalDetail = async()=>{
        try {
            const details = await getTotalBookingDetails()
            setMonthlyUserData([details.data]);
        } catch (error) {
            
        }
    }



    useEffect(()=>{
      getTotalDetail()
     
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
    <div className=''>
      <canvas ref={chartRefOne}></canvas>
    </div>
    </>
  )
}

export default AdminChart
