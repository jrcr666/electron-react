import React from 'react';
import Pepe from './components/pepe';
import Menu from './components/menu';

export default [
	{ key: 'menu', path: '/', exact: false, component: Menu },
	{ key: 'home', path: '/', exact: true, render: () => <h3>Hola Mundo! Routes</h3> },
	{ key: 'pepe', path: '/pepe', exact: true, component: Pepe }
];
