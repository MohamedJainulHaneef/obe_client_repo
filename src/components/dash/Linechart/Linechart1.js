import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';

// Enable the 3D module
Highcharts3D(Highcharts);

const apiUrl = process.env.REACT_APP_API_URL;

const BarChart3D = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/processedChartData`, {});
                const data = response.data;

                // Explicitly set total value as 333
                const total = 333; // You can replace this with the actual total if needed

                setChartData({
                    categories: ['CIA 1', 'CIA 2', 'Assignment 1', 'Assignment 2', 'ESE'],
                    data: [
                        data.counts.cia_1,
                        data.counts.cia_2,
                        data.counts.ass_1,
                        data.counts.ass_2,
                        data.counts.ese,
                    ],
                    total, // Store the total value as 333
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
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 0,
                depth: 30,
                viewDistance: 25,
            },
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
        },
        yAxis: {
            title: {
                text: 'Counts',
            },
        },
        plotOptions: {
            column: {
                depth: 40,
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
        <div style={{ width: '600px', height: '400px' }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default BarChart3D;
