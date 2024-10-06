import React, { useState, useEffect } from 'react';
import './barchart.css';

const ProgressBar = () => {
	const [cia1, setCia1] = useState(50); // Example percentages
	const [cia2, setCia2] = useState(60);
	const [ass1, setAss1] = useState(75);
	const [ass2, setAss2] = useState(30);
	const [ese, setEse] = useState(90);

	useEffect(() => {
		const fetchProgress = async () => {
			try {
				const response = await fetch('https://api.example.com/progress');
				const data = await response.json();
				// Here you would update the state based on fetched data, like:
				// setCia1(data.cia1);
				// setCia2(data.cia2);
				// setAss1(data.ass1);
				// setAss2(data.ass2);
				// setEse(data.ese);
			} catch (error) {
				console.error('Error fetching progress data:', error);
			}
		};

		fetchProgress();
	}, []);

	return (
		<div className='dash-barchart-main'>
			{/* CIA 1 */}
			<div className='dash-barchart-heading'>
				CIA 1 COMPONENT
				<span className="progress-label">{cia1}% / 100%</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia1}%` }}>
					{cia1}%
				</div>
			</div>

			{/* CIA 2 */}
			<div className='dash-barchart-heading'>
				CIA 2 COMPONENT
				<span className="progress-label">{cia2}% / 100%</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia2}%` }}>
					{cia2}%
				</div>
			</div>

			{/* ASS 1 */}
			<div className='dash-barchart-heading'>
				ASS 1 COMPONENT
				<span className="progress-label">{ass1}% / 100%</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass1}%` }}>
					{ass1}%
				</div>
			</div>

			{/* ASS 2 */}
			<div className='dash-barchart-heading'>
				ASS 2 COMPONENT
				<span className="progress-label">{ass2}% / 100%</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass2}%` }}>
					{ass2}%
				</div>
			</div>

			{/* ESE */}
			<div className='dash-barchart-heading'>
				ESE COMPONENT
				<span className="progress-label">{ese}% / 100%</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ese}%` }}>
					{ese}%
				</div>
			</div>
		</div>
	);
}

export default ProgressBar;
