import React from 'react';
import { Pie } from 'react-chartjs-2';
import './Piechart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart3 = () => {
    const data = {
        labels: ['SFM', 'SFW', 'AIDED'], // Three labels
        datasets: [
            {
                data: [30, 40, 30], // Adjust data to match three labels
                backgroundColor: [
                    'rgb(190, 0, 0)',    
                    'rgb(160, 32, 240)',    
                    'rgb(5, 114, 82)',    
                ],
                hoverBackgroundColor: [
                    'rgb(130, 0, 0)',
                    'rgb(150, 52, 240)',
                    'rgb(50, 100, 82)',    // Hover brighter slate blue
                ],
                borderColor: 'rgba(255, 255, 255, 1)', // White border for contrast
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',  // Place the legend below the chart
                labels: {
                    color: '#333',  // Custom text color for the legend
                    font: {
                        size: 14,   // Larger font for a more professional look
                    },
                    padding: 20, // Adjust padding between the legend items
                    boxWidth: 20, // Increase this value for a wider box
                    boxHeight: 20, // Increase this value for a taller box
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;  // Show percentage
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,  // Allows for better sizing control
    };

    return (
        <div style={{ width: '200px', height: '300px', margin: '20px' }}>
            <h3 className='pie-heading'>Category Pie Chart</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default Piechart3;
