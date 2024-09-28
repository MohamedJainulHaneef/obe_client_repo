import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barchart = () => {
    // Data for the bar chart
    const data = {
        labels: ['UG Arts', 'UG Science', 'PG Arts', 'PG Science', 'Overall'],
        datasets: [
            {
                label: 'Attainment Level',
                data: [25, 19, 3, 5, 20], // Example values for each bar
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', // UG Arts
                    'rgba(54, 162, 235, 1)', // UG Science
                    'rgba(255, 206, 86, 1)', // PG Arts
                    'rgba(75, 192, 192, 1)', // PG Science
                    'rgba(153, 102, 255, 1)', // Overall
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1, // Border width
            },
        ],
    };

    // Configuration options for the bar chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Show the legend
                position: 'bottom', // Position the legend at the bottom
                labels: {
                    generateLabels: (chart) => {
                        const backgroundColors = chart.data.datasets[0].backgroundColor;
                        const labels = chart.data.labels;
                        return labels.map((label, index) => ({
                            text: label,
                            fillStyle: backgroundColors[index],
                        }));
                    },
                    boxWidth: 20, //legend width
                    padding: 15, // Add padding between legend items
                },
            },
            title: {
                display: true,
                text: 'UG and PG Programme Outcomes',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Attainment Level',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Programmes',
                },
            },
        },
        barPercentage: 0.4, // Decrease this value to reduce the width of the bars (0.1 to 1)
        categoryPercentage: 0.7, // Adjust this for the category width (1 is default, decrease to reduce space)
    };

    // Pass the desired height as a prop to the Bar component
    return <Bar data={data} options={options} height={200}  />;  // You can adjust this value (e.g., 400)
};

export default Barchart;
