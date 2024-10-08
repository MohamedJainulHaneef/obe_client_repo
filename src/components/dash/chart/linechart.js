import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Linechart = () => 
{
    const data = 
    {
        labels: ['UG Arts', 'UG Science', 'PG Arts', 'PG Science', 'Overall'],
        datasets: [
            {
                label: 'Attainment Level',
                data: [25, 19, 3, 5, 20], 
                fill: true, 
                backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3,
                tension: 0.4, 
            },
        ],
    };

    const options = 
    {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
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
    };

    return (
        <div>
            <Line data={data} options={options} height={200} width={400} />
        </div>
    );
};

export default Linechart;
