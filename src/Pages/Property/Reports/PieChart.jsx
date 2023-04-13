{/* <PieChart percentWiseModuleCollectionData={percentWiseModuleCollectionData} /> */}

import React,{useState,useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {

  const [moduleWieseData, setmoduleWieseData] = useState({
    // labels: ['Property', 'Water', 'Trade'],
    labels: props?.label,
    datasets: [
      {
        label: '# in ₹',
        data: [0, 0, 0],
        backgroundColor: [
          
          '#22C55E',
          '#6366F1',
          '#EC4899'
        ],
        borderColor: [
          
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })
  console.log('moudle wise data data...',props?.data)


  // return
  useEffect(() => {
    setmoduleWieseData({
      labels: props?.label,
      datasets: [
        {
          label: '# in ₹',
          data: props?.data,
          backgroundColor: [
            
            '#22C55E',
            '#6366F1',
            '#EC4899'
          ],
          borderColor: [
            
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    })
    
  }, [props?.data])
  


  const options = {
    responsive: true,
    animation: {
      duration: 2000 // set the duration of the animation in milliseconds
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: false
      }
    },
  };

  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [propPercent, waterPercent, tradePercent],
  //       backgroundColor: [
          
  //         '#22C55E',
  //         '#6366F1',
  //         '#EC4899'
  //       ],
  //       borderColor: [
          
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  return (
    <Pie data={moduleWieseData} options={options} />
  )
}

export default PieChart