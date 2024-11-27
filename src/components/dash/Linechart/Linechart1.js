import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const apiUrl = process.env.REACT_APP_API_URL;

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/processedChartData`, {});
                const data = response.data;

                const total = 333; 

                setChartData({
                    categories: ['CIA 1', 'CIA 2', 'Assignment 1', 'Assignment 2', 'ESE'],
                    data: [
                        data.counts.cia_1,
                        data.counts.cia_2,
                        data.counts.ass_1,
                        data.counts.ass_2,
                        data.counts.ese,
                    ],
                    total,
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    if (!chartData) return <p>Loading chart data...</p>;

    const options = {
        chart: {
            type: 'column', // Standard bar chart (column type)
        },
        xAxis: {
            categories: chartData.categories,
            labels: {
                rotation: 0,
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                },
            },
            gridLineWidth: 0, 
        },
        yAxis: {
            title: {
                text: 'Counts',
            },
            gridLineWidth: 0, 
        },
        plotOptions: {
            column: {
                colorByPoint: true,
                dataLabels: {
                    enabled: true, // Enable data labels
                    color: '#000', // Color of the data labels
                    style: {
                        fontSize: '14px', // Font size of the labels
                        fontWeight: 'bold', // Font weight of the labels
                    },
                    verticalAlign: 'bottom', // Position the labels above the bars
                    y: -10, // Adjust the vertical position to place the labels above the bars
                    formatter: function () {
                        const value = this.y;
                        const total = chartData.total;
                        return `${value}/${total}`; // Display as value/total
                    },
                },
            },
        },
        series: [
            {
                name: 'Course Counts',
                data: chartData.data,
                colors: ['rgb(10, 161, 116)', 'rgb(224, 5, 5)', 'rgb(146, 0, 236)', '#ea9a0d', '#2ECC71'], // Custom bar colors
            },
        ],
    };

    return (
        <div style={{ width: '30%', height: '100%' }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default BarChart;
