import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import ErrorBoundary from './components/error-boundary'
import './index.css';


ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>, document.getElementById('root'));


