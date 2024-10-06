import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart3 = () => {
    const data = {
        labels: ['UG-ARTS', 'UG-SCIENCE', 'PG-ARTS', 'PG-SCIENCE'],
        datasets: [
            {
                data: [30, 20, 25, 25],
                backgroundColor: [
                    'rgba(56, 173, 169, 0.8)',    // Soft red gradient
                    'rgba(255, 127, 80, 0.8)',    // Sky blue gradient
                    'rgba(106, 90, 205, 0.8)',    // Lime green gradient
                    'rgba(218, 165, 32, 0.8)',    // Golden yellow gradient
                ],
                hoverBackgroundColor: [
                    'rgba(56, 173, 169, 2)',     // Hover brighter red
                    'rgba(255, 127, 80, 2)',     // Hover brighter blue
                    'rgba(106, 90, 205, 2)',     // Hover brighter green
                    'rgba(218, 165, 32, 2)',     // Hover brighter yellow
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
            <h3>Programme Pie Chart</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default Piechart3;
