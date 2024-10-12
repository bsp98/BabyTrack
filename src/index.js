import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <Router>
      <Provider store={store}>
      <App />
      </Provider>
    </Router>

  </React.StrictMode>
);


reportWebVitals();
