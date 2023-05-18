import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { updateLocalStorageData } from './utils/utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.body.style.margin = "0";
document.body.style.height = "100%";

const apiKey = localStorage.getItem('api-key');

updateLocalStorageData();

root.render(
  <React.StrictMode>
    {apiKey ? <Dashboard /> : <Login />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
