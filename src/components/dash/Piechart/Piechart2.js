import React from 'react';
import { Pie } from 'react-chartjs-2';
import './piechart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart2 = () => {
    const data = {
        labels: ['SFM', 'SFW', 'AIDED'], // Three labels
        datasets: [
            {
                data: [30, 40, 30], // Adjust data to match three labels
                backgroundColor: [
                    'rgba(56, 173, 169, 0.8)',    // Soft teal
                    'rgba(255, 127, 80, 0.8)',    // Soft coral
                    'rgba(106, 90, 205, 0.8)',    // Soft slate blue
                ],
                hoverBackgroundColor: [
                    'rgba(56, 173, 169, 1)',     // Hover brighter teal
                    'rgba(255, 127, 80, 1)',     // Hover brighter coral
                    'rgba(106, 90, 205, 1)',     // Hover brighter slate blue
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
        <div style={{ width: '300px', height: '300px', margin: '20px' }}>
            <h3 className='pie-heading'>Staff Pie Chart</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default Piechart2;
