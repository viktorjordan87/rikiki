import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './globals.scss';
import 'primereact/resources/themes/lara-light-cyan/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>
);
