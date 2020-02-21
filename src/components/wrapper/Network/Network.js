import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/global-context';

import './Network.css';

const NetworkContainer = props => {
	const {veil: {value}} = useContext(GlobalContext);

	return value ? (
		<div className='networkContainer'>
			<div className='overlay'>
				<div className="loader"></div>
			</div>
		</div>
	) : null
} 

export default NetworkContainer;