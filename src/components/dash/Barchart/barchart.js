import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './barchart.css';

const ProgressBar = () => 
{
	const apiUrl = process.env.REACT_APP_API_URL;
	const [componentReport, setComponentReport] = useState([]);
	const [cia1, setCia1] = useState(0);
	const [cia2, setCia2] = useState(0);
	const [ass1, setAss1] = useState(0);
	const [ass2, setAss2] = useState(0);
	const [ese, setEse] = useState(0);

	useEffect(() => 
	{
		const fetchProgress = async () => 
		{
			try 
			{
				const response = await axios.post(`${apiUrl}/api/componentreport`, {});
				const responseDate = response.data
				setComponentReport(responseDate);
				const cia1 = parseInt((responseDate.cia_1/componentReport.totalCount)*100);
				const cia2 = parseInt((responseDate.cia_2/componentReport.totalCount)*100);
				const ass1 = parseInt((responseDate.ass_1/componentReport.totalCount)*100);
				const ass2 = parseInt((responseDate.ass_2/componentReport.totalCount)*100);
				const ese  = parseInt((responseDate.ese/componentReport.totalCount)*100);
				setCia1(cia1);
				setCia2(cia2);
				setAss1(ass1);
				setAss2(ass2);
				setEse(ese);
			} 
			catch (err) {
				alert('Error fetching status report.');
				console.log('Error fetching data:', err);
			}
		}
		fetchProgress();
	}, [])

	return (
		<div className='dash-barchart-main'>
			<div className='dash-barchart-heading'>
				CIA 1 COMPONENT
				<span className="progress-label"> {componentReport.cia_1} / {componentReport.totalCount}</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia1}%` }}>
					{cia1}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				CIA 2 COMPONENT
				<span className="progress-label">{componentReport.cia_2} / {componentReport.totalCount}</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${cia2}%` }}>
					{cia2}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				ASS 1 COMPONENT
				<span className="progress-label">{componentReport.ass_1} / {componentReport.totalCount}</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass1}%` }}>
					{ass1}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				ASS 2 COMPONENT
				<span className="progress-label">{componentReport.ass_2} / {componentReport.totalCount}</span>
			</div>
			<div className="dash-progress-container">
				<div className="dash-progress-bar" style={{ width: `${ass2}%` }}>
					{ass2}%
				</div>
			</div>
			<div className='dash-barchart-heading'>
				ESE COMPONENT
				<span className="progress-label">{componentReport.ese} / {componentReport.totalCount}</span>
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
