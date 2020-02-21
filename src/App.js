import React, { useEffect, useState } from 'react';
import './App.css';

import NetworkWrapper from './components/wrapper/Network/Network';
import AlerterWrapper from './components/wrapper/Alerter/Alerter';

import useHttp from './hooks/http';


function App() {
	const { GET, data } = useHttp();
	const [user, setUser] = useState({});

	const requests = [
		`https://jsonplaceholder.typicode.com/todos/${Math.ceil(Math.random() * 200)}`,
		`https://jsonplaceholder.typicode.com/users/${Math.ceil(Math.random() * 10)}`,
		`https://reqres.in/api/users/${Math.ceil(Math.random() * 6)}`
	];

	useEffect(() => {
		setUser(data);
	}, [data])

	return (
		<React.Fragment>
			<NetworkWrapper/>
			<AlerterWrapper/>
			<div className="App">
				<button onClick={() => GET(requests[2]) }>VEIL</button>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</div>
		</React.Fragment>
	);
}

export default App;
