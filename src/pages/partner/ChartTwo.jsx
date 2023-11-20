import React, { useState, useEffect,useRef } from 'react'
import Chart from 'chart.js/auto';
import PartnerNavBar from '../../components/partner/PartnerNavBar';
import { functionPerdayEarnings } from '../../services/Apis';
import { useSelector } from "react-redux";

const ChartTwo = () => {
  
  const tocken = useSelector((state)=>state.tocken.tocken)

    const [bookingCount,setBookingCount]= useState([])
    const [bookingDate,setBookingDate]= useState([])
  
    async function getGraph(){
      const data = await functionPerdayEarnings(tocken)
    
      const result = data.data
  
    
      result?.bookings.map((e)=>setBookingDate([...bookingDate,e.date]))
      result?.bookings.map((e)=>setBookingCount([...bookingCount,e.totalcount]))
      
    }
  
    useEffect(()=>{
      getGraph()
     
    },[])
  
    const chartRefOne = useRef(null);
  
  
    useEffect(() => {
      const ctxOne = chartRefOne.current;
  
      const myChart = new Chart(ctxOne, {
        type: 'bar',
        data: {
          labels: bookingDate,
          datasets: [{
            label: '# of Votes',
            data: bookingCount,
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
    }, [bookingDate,bookingCount]);
  return (
    <div className=''>
    <canvas ref={chartRefOne}></canvas>
  </div>
  )
}

export default ChartTwo
