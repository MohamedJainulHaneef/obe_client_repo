// BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart1 = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const[staffdata, setStaffData] = useState([]);

  useEffect(()=>{
    const staffcount = async() =>{
      const response = await axios.get(`${apiUrl}/api/stafflinechart`);
    }

  },[])
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Daily Sales',
        data: [45, 60, 75, 50, 65],
        backgroundColor: 'rgba(0, 123, 255, 1)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Sales Data for the Week',
      },
    },
    scales: {
      x: {
        maxBarThickness: 20,        // Set maximum bar width
        categoryPercentage: 0.6,    // Adjusts the width of the bar space per category
        barPercentage: 0.5,         // Controls width within available space from categoryPercentage
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart1;

//course completed 
