import React, { useState, useEffect,useRef } from 'react'
import Chart from 'chart.js/auto';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { Listbox } from '@headlessui/react';
import PartnerNavBar from '../../components/partner/PartnerNavBar';
import { functionPerdayEarnings } from '../../services/Apis';

const ChartOne = () => {

    const [earningDate,setEarningsDate]=useState([])
    const [earningsAmount,setEarningsAmount] = useState([])
  
  //   const [bookingCount,setBookingCount]= useState([])
  //   const [bookingDate,setBookingDate]= useState([])
  
    async function getGraph(){
      const data = await functionPerdayEarnings()
    
      const result = data.data
  
      console.log(result,"<<<<<<<<<<<<<<<<,,,,");
      result?.data.map((e)=>setEarningsDate([...earningDate,e.date]))
      result?.data.map((e)=>setEarningsAmount([...earningsAmount,e.totalAmount]))
      // result?.bookings.map((e)=>setBookingDate([...bookingDate,e.date]))
      // result?.bookings.map((e)=>setBookingCount([...bookingCount,e.totalcount]))
      
    }
  
  
    useEffect(()=>{
      console.log("hhhhhhhhhhhhhhhh");
      getGraph()
     
    },[])
  
    const chartRef = useRef(null);
  
    console.log(earningDate,earningsAmount,"earning");
  
    useEffect(() => {
      const ctx = chartRef.current;
  
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: earningDate,
          datasets: [{
            label: '# of Votes',
            data: earningsAmount,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
      // Cleanup when the component is unmounted
      return () => {
        myChart.destroy();
      };
    }, [earningsAmount,earningDate]);
  return (
   <>

<div className=''>
      <canvas ref={chartRef}></canvas>
    </div>
   </>
  )
}

export default ChartOne
