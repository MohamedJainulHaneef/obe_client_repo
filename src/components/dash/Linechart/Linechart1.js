// BarChart.js
import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart2 = () => {
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
        maintainAspectRatio: false, // Allows chart to fill the container
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
                maxBarThickness: 10, // Limits bar width to 10 pixels
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
        <div style={{ width: '200px', height: '400px' }}> {/* Wider container */}
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart2;

