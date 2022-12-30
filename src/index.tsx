import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import { store } from './store/store';
import { createGlobalStyle } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const GlobalStyle = createGlobalStyle`
  body,ul {
    margin : 0;
    padding : 0;
  }
`

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle/>
      <App />
    </Provider>
  </React.StrictMode>
);


