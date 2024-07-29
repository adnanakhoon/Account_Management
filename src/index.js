import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import './index.css';
import AppRouter from './components/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
 