import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './piechart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart2 = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/staffpiechart`);
                const result = response.data;

                // Transform the data into the format required by the chart
                const labels = result.data.map(item => item.type);
                const data = result.data.map(item => item.count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor: [
                                'rgb(5, 114, 82)',    // Soft teal
                                'rgb(190, 0, 0)',    // Soft coral
                                'rgb(160, 32, 240)',    // Soft slate blue
                            ],
                            hoverBackgroundColor: [
                                'rgb(50, 100, 82)',     // Hover brighter teal
                                'rgb(130, 0, 0)',     // Hover brighter coral
                                'rgb(150, 52, 240)',     // Hover brighter slate blue
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
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                    padding: 10, // Adjust padding between the legend items
                    boxWidth: 20, // Increase this value for a wider box
                    boxHeight: 20, // Increase this value for a taller box
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`; // Show count
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    return (
        <div style={{ width: '300px', height: '300px', margin: '20px' }}>
            <h3 className='pie-heading'>Staff Pie Chart</h3>
            {loading ? <p>Loading...</p> : <Pie data={chartData} options={options} />}
        </div>
    );
};

export default Piechart2;
