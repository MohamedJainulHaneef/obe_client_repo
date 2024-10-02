import React, { useState, useEffect } from 'react';
import './barchart.css';

const ProgressBar = () => {
  const [progress, setProgress] = useState(50);

  // Fetch progress data from backend
  useEffect(() => {
    const fetchProgress = async () => {
      // Simulating a real API call with a timeout
      try {
        const response = await fetch('https://api.example.com/progress'); // Replace with your API endpoint
        const data = await response.json();
        setProgress(data.progress); // Assuming the API response contains a field 'progress'
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgress();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return (
    <div className='dash-barchart-main'>
      <div className='dash-barchart-heading'><span>CIA COMPONENT</span></div>
      <div className="dash-progress-container">
        <div className="dash-progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
