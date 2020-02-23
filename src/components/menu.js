import React, { useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { GlobalContext } from '../context/global-context';

import useHttp from '../hooks/http';

const { ipcRenderer } = window.require('electron');

const payload = {"query":"\n          query promotionsQuery($namespace: String!, $country: String!, $locale: String!) {\n            Catalog {\n              catalogOffers(namespace: $namespace, locale: $locale, params: {category: \"freegames\", country: $country, sortBy: \"effectiveDate\", sortDir: \"asc\"}) {\n                elements {\n                  title\n                  description\n                  id\n                  namespace\n                  categories {\n                    path\n                  }\n                  linkedOfferNs\n                  linkedOfferId\n                  keyImages {\n                    type\n                    url\n                  }\n                  productSlug\n                  promotions {\n                    promotionalOffers {\n                      promotionalOffers {\n                        startDate\n                        endDate\n                        discountSetting {\n                          discountType\n                          discountPercentage\n                        }\n                      }\n                    }\n                    upcomingPromotionalOffers {\n                      promotionalOffers {\n                        startDate\n                        endDate\n                        discountSetting {\n                          discountType\n                          discountPercentage\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        ","variables":{"namespace":"epic","country":"ES","locale":"es-ES"}};

export default props => {
	const { http, httpData } = useHttp();
	const [user, setUser] = useState({});
	const [games, setGames] = useState([]);
	const { veil } = useContext(GlobalContext);

	const requests = [
		`https://jsonplaceholder.typicode.com/todos/${Math.ceil(Math.random() * 200)}`,
		`https://jsonplaceholder.typicode.com/users/${Math.ceil(Math.random() * 10)}`,
		`https://reqres.in/api/users/${Math.ceil(Math.random() * 6)}`,
		'https://graphql.epicgames.com/graphql'
	];

	const getGames = (games) => {
		setGames(games);
		veil.setVeil(false);
	}

	ipcRenderer.on('response:games', (_, { data: { Catalog: { catalogOffers: { elements } } } } ) => {
		getGames(elements);
	});

	useEffect(() => {
		setUser(httpData);
	}, [httpData]);

	return (
		<div>
			<button onClick={() => http.GET(requests[2]) }>GET</button>
			<button onClick={() => http.POST(requests[2]) }>POST</button>
			<button onClick={() => http.PUT(requests[2]) }>PUT</button>
			<button onClick={() => http.DELETE(requests[2]) }>DELETE</button>
			<button onClick={() => http.DELETE(requests[3]) }>GAMES FAIL</button>
			<button onClick={() => {veil.setVeil(); ipcRenderer.send('getGames', payload) } }>Games</button>
			<Link to="/">Home</Link>
			<Link to={{
				pathname: '/pepe'
			}}>Pepe</Link>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<Route path="/jaja" exact render={() => <h3>Jaja!</h3>} />
			{games.map(g => (<div key={g.id}>
				<p>{g.title}</p>
				<img style={{width: '100%'}} src={g.keyImages[0].url} alt={g.title}/>
				</div>))}
		</div>
	)
}