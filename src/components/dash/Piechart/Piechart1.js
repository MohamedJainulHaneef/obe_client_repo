import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './piechart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart1 = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/studentpiechart`);
                const result = response.data;

                const labels = result.data.map(item => item.type);
                const data = result.data.map(item => item.count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor: [
                                'rgb(190, 0, 0)',
                                'rgb(160, 32, 240)',
                                'rgb(5, 114, 82)',
                            ],
                            hoverBackgroundColor: [
                                'rgb(130, 0, 0)',
                                'rgb(150, 52, 240)',
                                'rgb(50, 100, 82)',
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
        layout: {
            margin: {
                bottom: 70,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center', // Align the legend items to start (left)
                labels: {
                    color: '#333',
                    font: {
                        size: 17,
                    },
                    padding: 10, // Adjust padding between the legend items
                    boxWidth: 20, // Increase this value for a wider box
                    boxHeight: 20, // Increase this value for a taller box
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label; // Show only the label
                    },
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
