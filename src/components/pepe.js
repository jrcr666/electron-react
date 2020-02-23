import React from 'react';

export default props => {
	console.log(props);

	return (
		<div>
			<h1>Pepe</h1>
			<button onClick={() => props.history.goBack() }>BACK</button>
		</div>
	)
}