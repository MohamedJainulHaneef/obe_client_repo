import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RadarChart = () => 
{
    const data = 
    {
        labels: ['UG Arts', 'UG Science', 'PG Arts', 'PG Science', 'Overall'],
        datasets: [
            {
                label: 'UG Programmes',
                data: [25, 19, 3, 5, 20],
                backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                borderColor: 'rgba(255, 99, 132, 1)', 
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', 
                pointBorderColor: '#fff', 
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2, 
            },
            {
                label: 'PG Programmes',
                data: [20, 15, 8, 6, 18],
                backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                borderColor: 'rgba(54, 162, 235, 1)', 
                pointBackgroundColor: 'rgba(54, 162, 235, 1)', 
                pointBorderColor: '#fff', 
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2, 
            },
            {
                label: 'Overall',
                data: [30, 25, 10, 9, 25],
                backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                borderColor: 'rgba(75, 192, 192, 1)', 
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', 
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2, 
            },
        ],
    };

    const options = 
    {
        responsive: true,
        plugins: 
        {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'UG and PG Programme Outcomes (Radar Chart)',
            },
        },
        scales: 
        {
            r: { 
                beginAtZero: true, 
                angleLines: {
                    display: true, 
                },
                ticks: {
                    stepSize: 5, 
                },
            },
        },
    };

    return (
        <div style={{ width: '600px', margin: 'auto', paddingTop: '20px' }}>
            <Radar data={data} options={options} />
        </div>
    );
};

export default RadarChart;