import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store/store';

if (!('ontouchstart' in window)) {
  document.body.classList.add('no-touch');
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
