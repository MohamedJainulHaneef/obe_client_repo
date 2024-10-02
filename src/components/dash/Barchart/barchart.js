import React, { useState, useEffect } from 'react';
import './barchart.css';

const ProgressBar = () => {
	const [cia1, setCia1] = useState(50);
	const [cia2, setCia2] = useState(60);
	const [ass1, setAss1] = useState(75);
	const [ass2, setAss2] = useState(30);
	const [ese, setEse] = useState(90);

	useEffect(() => 
	{
		const fetchProgress = async () => 
		{
			try {
				const response = await fetch('https://api.example.com/progress');
				const data = await response.json();
			} catch (error) {
				console.error('Error fetching progress data:', error);
			}
		};

		fetchProgress();

	}, []);

	return (
		<div className='dash-barchart-main'>
			<div className='dash-barchart-heading'>
				CIA 1 COMPONENT
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia1}%` }}>
					{cia1}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				CIA 2 COMPONENT
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia2}%` }}>
					{cia2}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				ASS 1 COMPONENT
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass1}%` }}>
					{ass1}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				ASS 2 COMPONENT
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass2}%` }}>
					{ass2}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				ESE COMPONENT
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ese}%` }}>
					{ese}%
				</div>
			</div>
		</div>
	)
}

export default ProgressBar;
