import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/global-context';

import './Alerter.css';

const AlerterContainer = props => {
	const {alerter: { value: {active, type, text}, setAlerter }} = useContext(GlobalContext);
	const classes = ['containerAlerter', active ? 'open' : 'close', type];

	useEffect(() => {
		if (active) {
			setTimeout(() => setAlerter({ active: false, text, type }), 2000);
		};
	}, [ active ]);

	return (<div className={classes.join(' ')}>
		{text}
	</div>);
} 

export default AlerterContainer;