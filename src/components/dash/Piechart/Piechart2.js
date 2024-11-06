import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Piechart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Piechart2 = () => 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        const fetchData = async () => 
        {
            setLoading(true);
            try 
            {
                const response = await axios.get(`${apiUrl}/api/staffpiechart`);
                const result = response.data;

                const data = result.data.map(item => item.count);
                const total = data.reduce((acc, curr) => acc + curr, 0); 

                setChartData(
                {
                    labels:[`AIDED - ${result.aided}`,`SFM - ${result.sfm}`, `SFW - ${result.sfw}`],
                    datasets: [
                        {
                            data,
                            backgroundColor: [
                                'rgb(10, 161, 116)',    
                                'rgb(224, 5, 5)',    
                                'rgb(146, 0, 236)',    
                            ],
                            hoverBackgroundColor: [
                                'rgb(11, 110, 81)',     
                                'rgb(202, 7, 7)',     
                                'rgb(108, 7, 172)',     
                            ],
                            borderColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 2,
                        },
                    ],
                })
            } 
            catch (error) {
                console.error('Error Fetching Data :', error);
            } 
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [apiUrl]);

    const options = 
    {
        plugins: 
        {
            legend: 
            {
                display: true,
                position: 'bottom',
                labels: 
                {
                    color: '#333',
                    font: {
                        size: 17,
                    },
                    padding: 20,
                    boxWidth: 20,
                    boxHeight: 20,
                },
            },
            tooltip: 
            {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`; // Show count
                    },
                },
            },
            datalabels: 
            {
                color: '#fff',
                font: {
                    size: 15,
                    weight: 'bold',
                },
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    }

    return (
        <div style={{ width: '350px', height: '350px', margin: '20px' }}>
            <h3 className='pie-heading'>STAFF</h3>
            {loading ? <p>Loading...</p> : <Pie data={chartData} options={options} />}
        </div>
    )
}

export default Piechart2;