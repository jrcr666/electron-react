import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Routes from './routes';

import NetworkWrapper from './components/wrapper/Network/Network';
import AlerterWrapper from './components/wrapper/Alerter/Alerter';

import './App.css';

function App() {
	const routes = Routes.map(r => <Route {...r}/>);

	return (
		<BrowserRouter>
			<NetworkWrapper/>
			<AlerterWrapper/>
			<div className="App">
				{routes}
			</div>
		</BrowserRouter>
	);
}

export default App;
