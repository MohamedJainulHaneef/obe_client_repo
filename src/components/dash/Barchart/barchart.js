import React, { useState, useEffect } from 'react';
import './barchart.css';

const ProgressBar = () => {
	const [cia1, setCia1] = useState(0); // Initial state starts at 0 for animation
	const [cia2, setCia2] = useState(0);
	const [ass1, setAss1] = useState(0);
	const [ass2, setAss2] = useState(0);
	const [ese, setEse] = useState(0);

	// Simulate fetching the actual values and animating the progress bar
	useEffect(() => {
		const fetchProgress = async () => {
			// Simulated API delay to showcase animation
			setTimeout(() => {
				// Replace these with actual API responses
				setCia1(50);
				setCia2(60);
				setAss1(75);
				setAss2(30);
				setEse(90);
			}, 500); // Adding a slight delay to simulate data fetching
		};

		fetchProgress();
	}, []);

	return (
		<div className='dash-barchart-main'>
			{/* CIA 1 */}
			<div className='dash-barchart-heading'>
				CIA 1 COMPONENT
				<span className="progress-label">{cia1} / 333</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia1}%` }}>
					{cia1}%
				</div>
			</div>

			{/* CIA 2 */}
			<div className='dash-barchart-heading'>
				CIA 2 COMPONENT
				<span className="progress-label">{cia2} / 333</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia2}%` }}>
					{cia2}%
				</div>
			</div>

			{/* ASS 1 */}
			<div className='dash-barchart-heading'>
				ASS 1 COMPONENT
				<span className="progress-label">{ass1} / 333</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass1}%` }}>
					{ass1}%
				</div>
			</div>

			{/* ASS 2 */}
			<div className='dash-barchart-heading'>
				ASS 2 COMPONENT
				<span className="progress-label">{ass2} / 333</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass2}%` }}>
					{ass2}%
				</div>
			</div>

			{/* ESE */}
			<div className='dash-barchart-heading'>
				ESE COMPONENT
				<span className="progress-label">{ese} / 333</span>
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
