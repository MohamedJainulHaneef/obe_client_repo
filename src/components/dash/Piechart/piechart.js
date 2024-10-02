// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const charts = [
    {
      labels: ['Red', 'Blue', 'Green', 'Yellow'],
      dataValues: [25, 25, 25, 25],
      backgroundColors: [
        'rgba(255, 0, 0, 1)',    // Solid red
        'rgba(0, 0, 255, 1)',    // Solid blue
        'rgba(0, 255, 0, 1)',    // Solid green
        'rgba(255, 255, 0, 1)',  // Solid yellow
      ],
    },
    {
      labels: ['Orange', 'Purple', 'Pink', 'Cyan'],
      dataValues: [40, 20, 30, 10],
      backgroundColors: [
        'rgba(255, 128, 0, 1)',    // Solid orange
        'rgba(128, 0, 255, 1)',    // Solid purple
        'rgba(255, 0, 255, 1)',    // Solid pink
        'rgba(0, 255, 255, 1)',    // Solid cyan
      ],
    },
    {
      labels: ['Grey', 'Magenta', 'Lime', 'Light Pink'],
      dataValues: [10, 40, 30, 20],
      backgroundColors: [
        'rgba(128, 128, 128, 1)',    // Solid grey
        'rgba(255, 0, 255, 1)',      // Solid magenta
        'rgba(0, 255, 128, 1)',      // Solid lime
        'rgba(255, 128, 128, 1)',    // Solid light pink
      ],
    },
  ];

  return (
    <div>
      <h1>Three Pie Charts with Solid Colors</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {charts.map((chart, index) => (
          <div key={index} style={{ width: '300px', margin: '20px' }}>
            <h3>Pie Chart {index + 1}</h3>
            <Pie
              data={{
                labels: chart.labels,
                datasets: [
                  {
                    data: chart.dataValues,
                    backgroundColor: chart.backgroundColors,
                    borderColor: 'rgba(255, 255, 255, 1)',  // White border
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
