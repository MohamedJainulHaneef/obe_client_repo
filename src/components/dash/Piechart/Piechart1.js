import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Piechart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import the plugin
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);  // Register the plugin

const Piechart1 = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/studentpiechart`);
                const result = response.data;
                const data = result.data.map(item => item.count);

                setChartData({
                    labels: [`AIDED - ${result.aided}`, `SFM - ${result.sfm}`, `SFW - ${result.sfw}`],
                    datasets: [
                        {
                            data,
                            backgroundColor: [
                                'rgb(10, 161, 116)',    // Soft teal
                                'rgb(224, 5, 5)',       // Soft coral
                                'rgb(146, 0, 236)',     // Soft slate blue
                            ],
                            hoverBackgroundColor: [
                                'rgb(11, 110, 81)',     // Hover brighter teal
                                'rgb(202, 7, 7)',       // Hover brighter coral
                                'rgb(108, 7, 172)',     // Hover brighter slate blue
                            ],
                            borderColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 2,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
                labels: {
                    color: '#333',
                    font: {
                        size: 17,
                    },
                    padding: 20,
                    boxWidth: 20,
                    boxHeight: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label;
                    },
                },
            },
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    let percentage = ((value / sum) * 100).toFixed(2) + "%";  // Calculate percentage
                    return percentage;
                },
                color: '#fff',
                font: {
                    size: 15,
                    weight: 'bold',
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    return (
        <div style={{ width: '300px', height: '300px', margin: '20px' }}>
            <h3 className='pie-heading'>Student Pie Chart</h3>
            {loading ? <p>Loading...</p> : <Pie data={chartData} options={options} />}
        </div>
    );
};

export default Piechart1;
