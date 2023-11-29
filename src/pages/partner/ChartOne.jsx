import React, { useState, useEffect,useRef } from 'react'
import Chart from 'chart.js/auto';
import PartnerNavBar from '../../components/partner/PartnerNavBar';
import { functionPerdayEarnings } from '../../services/Apis.js';
import { useSelector} from "react-redux";

const ChartOne = () => {

  const tocken = useSelector((state)=>state?.tocken?.tocken)

    const [earningDate,setEarningsDate]=useState([])
    const [earningsAmount,setEarningsAmount] = useState([])
  
  
    async function getGraph(){
      const data = await functionPerdayEarnings(tocken)
    
      const result = data.data
      result?.data.map((e)=>setEarningsDate([...earningDate,e.date]))
      result?.data.map((e)=>setEarningsAmount([...earningsAmount,e.totalAmount]))
      
    }
  
  
    useEffect(()=>{
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
