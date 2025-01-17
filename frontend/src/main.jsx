import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can include your global styles here
import App from './App'; // The main App component
import { Provider } from 'react-redux';
import store from './redux/store'; // Import the Redux store

// Create a root for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped with Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
